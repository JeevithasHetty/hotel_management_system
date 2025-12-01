const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all guests
router.get('/', (req, res) => {
  db.query('SELECT * FROM guests', (err, results) => {
    if (err) {
      console.error('Error fetching guests:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add a new guest
router.post('/', (req, res) => {
  const { name, email, phone } = req.body;

  // Simple validation
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  const sql = 'INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)';
  db.query(sql, [name, email, phone], (err, result) => {
    if (err) {
      console.error('Error inserting guest:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

module.exports = router;
