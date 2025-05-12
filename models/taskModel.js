const db = require('../db/database');

const Task = {
  getAll: (callback) => db.all("SELECT * FROM tasks", callback),

  getById: (id, callback) =>
    db.get("SELECT * FROM tasks WHERE id = ?", [id], callback),

  search: (query, callback) =>
    db.all("SELECT * FROM tasks WHERE title LIKE ?", [`%${query}%`], callback),

  create: (task, callback) =>
    db.run(
      `INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)`,
      [task.title, task.description, task.due_date, task.status],
      callback
    ),

  update: (id, task, callback) =>
    db.run(
      `UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      [task.title, task.description, task.due_date, task.status, id],
      callback
    ),

  delete: (id, callback) =>
    db.run("DELETE FROM tasks WHERE id = ?", [id], callback),
};

module.exports = Task;
