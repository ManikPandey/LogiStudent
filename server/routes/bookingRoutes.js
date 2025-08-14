const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // Import our new middleware
const { createBooking, getMyBookings, submitPaymentDetails } = require('../controllers/bookingController');

// Apply the 'protect' middleware to these routes
router.route('/').post(protect, createBooking);
router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id/pay').put(protect, submitPaymentDetails);

module.exports = router;