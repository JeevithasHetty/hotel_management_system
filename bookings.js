const express = require('express');
const router = express.Router();
const db = require('./db');

// CREATE a new booking
router.post('/', (req, res) => {
  const { guest_id, room_number, check_in, check_out } = req.body;

  if (!guest_id || !room_number || !check_in || !check_out) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO bookings (guest_id, room_number, check_in, check_out)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [guest_id, room_number, check_in, check_out], (err, result) => {
    if (err) {
      console.error('Error inserting booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ id: result.insertId });
  });
});

// DELETE a booking by ID
router.delete('/:id', (req, res) => {
  const bookingId = req.params.id;

  const sql = `DELETE FROM bookings WHERE id = ?`;

  db.query(sql, [bookingId], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json({ message: `Booking with ID ${bookingId} deleted` });
  });
});

module.exports = router;
