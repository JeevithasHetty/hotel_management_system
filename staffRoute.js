const express = require('express');
const router = express.Router();
const db = require('./db');

// Get all staff
router.get('/', (req, res) => {
  db.query('SELECT * FROM staff', (err, results) => {
    if (err) {
      console.error('Error fetching staff:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add a staff member
router.post('/', (req, res) => {
  const { name, role, contact } = req.body;
  
  if (!name || !role || !contact) {
    return res.status(400).json({ error: 'Name, role, and contact are required' });
  }
  
  db.query('INSERT INTO staff (name, role, contact) VALUES (?, ?, ?)', [name, role, contact], (err, result) => {
    if (err) {
      console.error('Error inserting staff:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ id: result.insertId });
  });
});

// Delete staff member
router.delete('/:id', (req, res) => {
  const staffId = req.params.id;
  db.query('DELETE FROM staff WHERE id = ?', [staffId], (err, result) => {
    if (err) {
      console.error('Error deleting staff:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Staff member not found' });
    }
    res.json({ message: `Staff member ${staffId} deleted successfully` });
  });
});

module.exports = router;
