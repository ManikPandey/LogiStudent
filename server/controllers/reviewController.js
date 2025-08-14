const Review = require('../models/ReviewModel');

// @desc    Get all approved reviews
// @route   GET /api/reviews
// @access  Public
const getApprovedReviews = async (req, res) => {
    try {
        // We'll fetch the 6 most recent approved reviews
        const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 }).limit(6);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Admin creates a review
// @route   POST /api/reviews
// @access  Private/Admin
const createReview = async (req, res) => {
    const { name, role, rating, quote } = req.body;
    try {
        const review = new Review({ name, role, rating, quote, isApproved: true });
        const createdReview = await review.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { getApprovedReviews, createReview };