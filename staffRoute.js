const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all staff
router.get('/', (req, res) => {
  db.query('SELECT * FROM staff', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a staff member
router.post('/', (req, res) => {
  const { name, role, contact } = req.body;
  db.query('INSERT INTO staff (name, role, contact) VALUES (?, ?, ?)', [name, role, contact], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId });
  });
});

module.exports = router;