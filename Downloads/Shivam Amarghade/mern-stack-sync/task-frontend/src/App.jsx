import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import {
  openDB,
  addTask,
  getAllTasks,
  addToQueue,
  getQueue,
  clearQueue,
} from "./utils/db";

const API_URL = "/api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    loadTasks();
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleOnline = () => {
    setOnline(true);
    syncQueue();
  };

  const handleOffline = () => setOnline(false);

  const loadTasks = async () => {
    const localTasks = await getAllTasks();
    // filter out deleted tasks for UI
    setTasks(localTasks.filter((t) => !t.is_deleted));
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      id: editId || crypto.randomUUID(),
      ...form,
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false,
    };

    await addTask(task); // save locally

    if (editId) {
      await addToQueue({ type: "update", task });
    } else {
      await addToQueue({ type: "create", task });
    }

    setForm({ title: "", description: "" });
    setEditId(null);
    loadTasks();

    if (online) syncQueue();
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditId(task.id);
  };

  const handleDelete = async (task) => {
    const deletedTask = {
      ...task,
      is_deleted: true,
      updated_at: new Date().toISOString(),
    };

    await addTask(deletedTask); // update local IndexedDB
    await addToQueue({ type: "delete", task: deletedTask }); // queue for sync
    loadTasks(); // refresh UI

    if (online) syncQueue(); // try sync immediately
  };

  const syncQueue = async () => {
    const queue = await getQueue();
    for (let op of queue) {
      try {
        if (op.type === "create") await axios.post(API_URL, op.task);
        if (op.type === "update")
          await axios.put(`${API_URL}/${op.task.id}`, op.task);
        if (op.type === "delete")
          await axios.delete(`${API_URL}/${op.task.id}`);
      } catch (err) {
        console.log("Sync failed for operation:", op.type, err);
        continue; // leave failed ops in queue
      }
    }
    await clearQueue(); // clear only successfully synced ops
    loadTasks(); // reload local tasks
  };

  return (
    <div className="container">
      <div className={`status ${online ? "online" : "offline"}`}>
        {online ? "🟢 Online" : "🔴 Offline"} Task Manager
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{editId ? "Update Task" : "Add Task"}</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? "completed" : ""}>
            <div className="task-info">
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </div>
            <div className="task-buttons">
              <button className="edit" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(task)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
