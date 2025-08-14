const express = require('express');
const router = express.Router();
const { getApprovedReviews, createReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

// Public route to get approved reviews for the homepage
router.route('/').get(getApprovedReviews);

// Admin-only route to add a new review
router.route('/').post(protect, admin, createReview);

module.exports = router;