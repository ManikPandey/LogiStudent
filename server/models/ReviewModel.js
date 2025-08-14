const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the student
  role: { type: String, default: 'VIT Bhopal Student' }, // e.g., 'B.Tech CSE'
  rating: { type: Number, required: true, min: 1, max: 5 }, // The 1-5 star rating
  quote: { type: String, required: true }, // The 1-2 line review text
  isApproved: { type: Boolean, default: true }, // Lets you control which reviews are shown
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;