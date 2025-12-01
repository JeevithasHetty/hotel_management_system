// payment.js
const express = require('express');
const router = express.Router();
const db = require('./db');

// POST /api/payments
router.post('/', (req, res) => {
  const { booking_id, amount, payment_date } = req.body;

  if (!booking_id || !amount) {
    return res.status(400).json({ error: 'Booking ID and Amount are required' });
  }

  const query = `
    INSERT INTO payments (booking_id, amount, payment_date)
    VALUES (?, ?, ?)
  `;

  // If user didn't provide a date, we can pass NULL to use DEFAULT CURRENT_DATE
  const dateToUse = payment_date || null;

  db.query(query, [booking_id, amount, dateToUse], (err, result) => {
    if (err) {
      console.error('Error inserting payment:', err);
      return res.status(500).json({ error: 'Failed to record payment' });
    }
    res.status(200).json({ message: 'Payment recorded successfully' });
  });
});

module.exports = router;
