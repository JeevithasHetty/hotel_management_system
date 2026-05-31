const express = require('express');
const router = express.Router();
const db = require('./db');

// GET all payments
router.get('/', (req, res) => {
  db.query('SELECT * FROM payments', (err, results) => {
    if (err) {
      console.error('Error fetching payments:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// POST - Record a new payment
router.post('/', (req, res) => {
  const { booking_id, amount, payment_date } = req.body;

  if (!booking_id || !amount) {
    return res.status(400).json({ error: 'Booking ID and Amount are required' });
  }

  const query = `
    INSERT INTO payments (booking_id, amount, payment_date)
    VALUES (?, ?, ?)
  `;

  const dateToUse = payment_date || null;

  db.query(query, [booking_id, amount, dateToUse], (err, result) => {
    if (err) {
      console.error('Error inserting payment:', err);
      return res.status(500).json({ error: 'Failed to record payment' });
    }
    res.status(201).json({ message: 'Payment recorded successfully', id: result.insertId });
  });
});

module.exports = router;
