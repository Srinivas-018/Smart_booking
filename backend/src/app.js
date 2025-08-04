const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const sequelize = require('./config/database');
const seedDatabase = require('./utils/seed');
const { startBookingCleanupJob } = require('./controllers/booking.controller');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORRECTED: This path now correctly points to the 'uploads' folder
// at the root of the backend project, one level above 'src'.
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// --- API ROUTES ---
const apiRoutes = require('./api');
app.use('/api', apiRoutes);

// Register the new admin routes to fetch all bookings
const adminRoutes = require('./api/admin.routes');
app.use('/api/admin', adminRoutes);
// --- END API ROUTES ---


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Movie Booking System API! (Development Mode)' });
  });
}

let db;
const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized successfully.');
    await seedDatabase();
    console.log('Database seeded successfully.');
    startBookingCleanupJob();
    console.log('Booking cleanup job started.');
  } catch (error) {
    console.error('Unable to initialize the database:', error);
    process.exit(1);
  }
};

module.exports = { app, initializeDatabase };