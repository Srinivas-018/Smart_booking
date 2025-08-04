const express = require('express');
const router = express.Router();

// All routes are imported, but only authRoutes is currently active.
const authRoutes = require('./auth.routes');
const movieRoutes = require('./movies.routes');
const theaterRoutes = require('./theaters.routes');
const showRoutes = require('./shows.routes');
const bookingRoutes = require('./bookings.routes');
const reviewRoutes = require('./reviews.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes); // This route is active.
router.use('/movies', movieRoutes);
router.use('/theaters', theaterRoutes);
router.use('/shows', showRoutes);
router.use('/bookings', bookingRoutes);
router.use('/reviews', reviewRoutes);
router.use('/admin', adminRoutes);

module.exports = router;