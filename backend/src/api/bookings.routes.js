const express_booking = require('express');
const router_booking = express_booking.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken: verifyToken_booking } = require('../middleware/auth.middleware');
router_booking.use(verifyToken_booking);
router_booking.post('/start', bookingController.startBooking);
router_booking.post('/confirm', bookingController.confirmBooking);
router_booking.get('/history', bookingController.getBookingHistory);
module.exports = router_booking;