import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin/';
const SLOTS_API_URL = 'http://localhost:5000/api/slots/';
// Get all bookings
const getAllBookings = async (token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(API_URL + 'bookings', config);
    return response.data;
};

// Update a booking status
const updateBookingStatus = async (bookingId, status, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(API_URL + `bookings/${bookingId}/status`, { status }, config);
    return response.data;
};

//  Get all slots 
const getSlots = async () => {
    const response = await axios.get(SLOTS_API_URL);
    return response.data;
};

//  Create a slot
const createSlot = async (slotData, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post(SLOTS_API_URL, slotData, config);
    return response.data;
};

//  Delete a slot
const deleteSlot = async (slotId, token) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.delete(API_URL + `slots/${slotId}`, config);
    return response.data;
};

const adminService = {
    getAllBookings,
    updateBookingStatus,
    getSlots,
    createSlot,
    deleteSlot,
};


export default adminService;