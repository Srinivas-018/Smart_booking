const express = require('express');
const router = require('express').Router();

// --- Controller Imports ---
const adminAuthController = require('../controllers/adminAuthController');
const movieController = require('../controllers/movie.controller');
const theaterAdminController = require('../controllers/admin/theater.controller');
const showAdminController = require('../controllers/admin/show.controller');
const bookingAdminController = require('../controllers/admin/booking.controller');
const upload = require('../middleware/upload');

// --- Middleware Import ---
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');


// =========== 1. PUBLIC ADMIN ROUTE ===========
router.post('/login', adminAuthController.login);


// =========== 2. MIDDLEWARE ===========
router.use(verifyToken, isAdmin);

// =========== 3. PROTECTED ADMIN ROUTES ===========

// Movie management routes
router.post('/movies', upload.single('posterImage'), movieController.adminAddMovie);
// The update route also needs the upload middleware for poster changes
router.put('/movies/:id', upload.single('posterImage'), movieController.adminUpdateMovie);
router.delete('/movies/:id', movieController.adminDeleteMovie);

// Theater management routes
router.post('/theaters', theaterAdminController.create);
router.put('/theaters/:id', theaterAdminController.update);
router.delete('/theaters/:id', theaterAdminController.delete);

// Show management routes
router.post('/shows', showAdminController.create);
router.put('/shows/:id', showAdminController.update);
router.delete('/shows/:id', showAdminController.delete);

// Route to get all confirmed bookings
router.get('/bookings', bookingAdminController.getAllBookings);

module.exports = router;