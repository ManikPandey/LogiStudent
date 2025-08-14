// client/src/features/auth/authService.js
import axios from 'axios';

const API_URL = 'https://logistudent.onrender.com/api/auth/';


const register = async (userData) => {
  // --- CHECKPOINT C ---
  console.log('authService: Attempting to make axios.post call...');

  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// ADD THIS: Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};


// ADD THIS: Logout user
const logout = () => {
  localStorage.removeItem('user');
};


// UPDATE THE EXPORT
const authService = {
  register,
  logout, 
  login,
};

export default authService;