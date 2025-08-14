const express = require('express');
const router = express.Router();

const {
    getAllBookings,
    updateBookingStatus,
    deleteSlot,
} = require('../controllers/adminController');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// All routes in this file are protected and admin-only
router.use(protect, admin);

// Booking Management
router.route('/bookings').get(getAllBookings);
router.route('/bookings/:id/status').put(updateBookingStatus);

// Slot Management
router.route('/slots/:id').delete(deleteSlot);

module.exports = router;