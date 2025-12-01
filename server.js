 const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// Register routes
const roomRoutes = require('./room_route');
app.use('/api/rooms', roomRoutes);

const guestRoutes = require('./guests'); // ✅ add this line
app.use('/api/guests', guestRoutes); 

const bookingRoutes = require('./bookings'); // ✅ add this line
app.use('/api/bookings', bookingRoutes); 

const paymentRoutes = require('./payments'); // ✅ add this line
app.use('/api/payments', paymentRoutes); 

// ✅ and this line

const staffRoute = require('./staffRoute'); // ✅ add this line
app.use('/api/staffRoute', staffRoute); 




// Serve HTML pages
app.get('/add_room.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'add_room.html'));
});

app.get('/available_rooms.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'available_rooms.html'));
});

app.get('/qr_action.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'qr_action.html'));
});

// Default route
app.get('*', (req, res) => {
  res.redirect('/available_rooms.html');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('✅ Server running at http://192.168.83.44:3000');
});