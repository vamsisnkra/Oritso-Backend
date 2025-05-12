const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all tasks
router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// SEARCH tasks by title or description
router.get('/search', (req, res) => {
  const { q } = req.query;
  db.all(
    'SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC',
    [`%${q}%`, `%${q}%`],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

// CREATE task
router.post('/', (req, res) => {
  const { title, description, due_date, status } = req.body;
  const now = new Date().toISOString();
  db.run(
    'INSERT INTO tasks (title, description, due_date, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
    [title, description, due_date, status || 'Pending', now, now],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// DELETE task
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM tasks WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

// UPDATE task
router.put('/:id', (req, res) => {
  const { title, description, due_date, status } = req.body;
  const now = new Date().toISOString();
  db.run(
    'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ?, updated_at = ? WHERE id = ?',
    [title, description, due_date, status, now, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    }
  );
});

// GET /api/tasks/search?q=keyword
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing search query' });

  const sql = `SELECT * FROM tasks WHERE title LIKE ? OR description LIKE ? ORDER BY created_at DESC`;
  const params = [`%${q}%`, `%${q}%`];

  db.all(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


module.exports = router;
