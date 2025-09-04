const express = require("express");
const taskService = require("../services/taskService");

const router = express.Router();

// Get all
router.get("/", (req, res) => {
  res.json(taskService.getAllTasks());
});

// Get one
router.get("/:id", (req, res) => {
  const task = taskService.getTaskById(req.params.id);
  if (!task || task.is_deleted)
    return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Create
router.post("/", (req, res) => {
  const { title, description, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const task = taskService.createTask({ title, description, completed });
  res.status(201).json(task);
});

// Update
router.put("/:id", (req, res) => {
  const task = taskService.updateTask(req.params.id, req.body);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// Delete (soft)
router.delete("/:id", (req, res) => {
  const ok = taskService.softDeleteTask(req.params.id);
  if (!ok) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
});

module.exports = router;
