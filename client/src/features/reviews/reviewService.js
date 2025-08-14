import axios from 'axios';

const API_URL = 'https://logistudent.onrender.com/api/reviews/';

// Get all approved reviews
const getReviews = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const reviewService = {
  getReviews,
};

export default reviewService;