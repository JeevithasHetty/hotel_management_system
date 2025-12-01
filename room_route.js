const express = require('express');
const router = express.Router();
const db = require('./db');
const QRCode = require('qrcode');

// Get all rooms
router.get('/', (req, res) => {
  db.query('SELECT * FROM rooms', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a new room
router.post('/add', (req, res) => {
  const { room_number, type, price } = req.body;

  if (!room_number || !type || !price) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const sql = `
    INSERT INTO rooms (room_number, type, price, status, is_available)
    VALUES (?, ?, ?, 'available', 1)
  `;

  db.query(sql, [room_number, type, price], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Room added successfully!' });
  });
});

// Check-in route
router.put('/checkin/:room_number', (req, res) => {
  const room_number = req.params.room_number;
  db.query(
    "UPDATE rooms SET status = 'booked', is_available = 0 WHERE room_number = ?",
    [room_number],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: `Room ${room_number} successfully checked in.` });
    }
  );
});

// Check-out route
router.put('/checkout/:room_number', (req, res) => {
  const room_number = req.params.room_number;
  db.query(
    "UPDATE rooms SET status = 'available', is_available = 1 WHERE room_number = ?",
    [room_number],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: `Room ${room_number} successfully checked out.` });
    }
  );
});

// Generate QR for check-in/check-out
router.get('/qr/:room_number/:action', (req, res) => {
  const { room_number, action } = req.params;

  if (!['checkin', 'checkout'].includes(action)) {
    return res.status(400).json({ error: 'Invalid action. Use checkin or checkout.' });
  }

  const serverIP = '192.168.96.44'; // Change if your local IP is different
  const qrURL = `http://${serverIP}:3000/qr_action.html?action=${action}&room=${room_number}`;

  QRCode.toDataURL(qrURL, (err, url) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ qr: url });
  });
});
// Delete a room by room_number
router.delete('/:room_number', (req, res) => {
  const room_number = req.params.room_number;

  const sql = 'DELETE FROM rooms WHERE room_number = ?';

  db.query(sql, [room_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.json({ message: `Room ${room_number} deleted successfully.` });
  });
});


module.exports = router;
