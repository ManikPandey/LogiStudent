const express = require('express');
const router = express.Router();
const { getAvailableSlots, createSlot } = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/').get(getAvailableSlots);

router.route('/').post(protect, admin, createSlot)

module.exports = router;