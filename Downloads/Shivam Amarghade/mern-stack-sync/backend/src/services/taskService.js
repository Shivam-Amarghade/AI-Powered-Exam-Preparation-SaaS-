const db = require("../db");
const { v4: uuidv4 } = require("uuid");

function now() {
  return new Date().toISOString();
}

function createTask({ title, description = "", completed = false }) {
  const id = uuidv4();
  const createdAt = now();
  db.prepare(
    `
    INSERT INTO tasks (id, title, description, completed, created_at, updated_at, is_deleted)
    VALUES (?,?,?,?,?,?,0)
  `
  ).run(id, title, description, completed ? 1 : 0, createdAt, createdAt);

  return getTaskById(id);
}

function getAllTasks() {
  return db.prepare(`SELECT * FROM tasks WHERE is_deleted=0`).all();
}

function getTaskById(id) {
  return db.prepare(`SELECT * FROM tasks WHERE id=?`).get(id);
}

function updateTask(id, { title, description, completed }) {
  const existing = getTaskById(id);
  if (!existing || existing.is_deleted) return null;

  db.prepare(
    `
    UPDATE tasks
    SET title=?, description=?, completed=?, updated_at=?
    WHERE id=?
  `
  ).run(
    title ?? existing.title,
    description ?? existing.description,
    completed !== undefined ? (completed ? 1 : 0) : existing.completed,
    now(),
    id
  );

  return getTaskById(id);
}

function softDeleteTask(id) {
  const existing = getTaskById(id);
  if (!existing || existing.is_deleted) return false;

  db.prepare(`UPDATE tasks SET is_deleted=1, updated_at=? WHERE id=?`).run(
    now(),
    id
  );
  return true;
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  softDeleteTask,
};
