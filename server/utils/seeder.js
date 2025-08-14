const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');

// Load data files
const reviewsData = require('../data/reviews');

// Load models
const Review = require('../models/ReviewModel');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to DB
connectDB();

// Function to import data into DB
const importData = async () => {
  try {
    // Clear existing reviews to avoid duplicates
    await Review.deleteMany(); 

    // Insert the array of review data
    await Review.insertMany(reviewsData);

    console.log('✅ Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    await Review.deleteMany();
    console.log('🔥 Data Destroyed Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error with data destruction: ${error}`);
    process.exit(1);
  }
};

// Check for command line arguments to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}