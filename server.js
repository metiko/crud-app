const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// In-memory database for users
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST a new user
app.post('/api/users', (req, res) => {
  const { name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newUser = { id: users.length + 1, name, email, age: parseInt(age, 10) };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT (update) a user by ID
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const user = users.find((user) => user.id === parseInt(id, 10));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (name) user.name = name;
  if (email) user.email = email;
  if (age) user.age = parseInt(age, 10);
  res.json(user);
});

// DELETE a user by ID
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id, 10));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
