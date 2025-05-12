const Task = require("../models/taskModel");

exports.getTasks = (req, res) => {
  if (req.query.search) {
    Task.search(req.query.search, (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    });
  } else {
    Task.getAll((err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    });
  }
};

exports.getTask = (req, res) => {
  Task.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.createTask = (req, res) => {
  Task.create(req.body, function (err) {
    if (err) return res.status(500).json(err);
    res.status(201).json({ id: this.lastID });
  });
};

exports.updateTask = (req, res) => {
  Task.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
};

exports.deleteTask = (req, res) => {
  Task.delete(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.sendStatus(204);
  });
};
