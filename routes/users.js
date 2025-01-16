const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE: Add a new user
router.post('/', (req, res) => {
  const { name, email, age } = req.body;
  const query = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  db.query(query, [name, email, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', id: result.insertId });
  });
});

// READ: Get all users
router.get('/', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// UPDATE: Update a user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const query = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  db.query(query, [name, email, age, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated' });
  });
});

// DELETE: Remove a user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 25 },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com', age: 30 }
];

// GET /users
router.get('/', (req, res) => {
  res.json(users);
});

module.exports = router;
