import axios from 'axios';
const SLOTS_API_URL = 'http://localhost:5000/api/slots/';
const API_URL = 'http://localhost:5000/api/bookings/';

// Get user bookings
const getMyBookings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + 'mybookings', config);

    return response.data;
};

const getSlots = async () => {
    const response = await axios.get(SLOTS_API_URL);
    return response.data;
}

const createBooking = async (bookingData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, bookingData, config);
    return response.data;

}
const submitPaymentDetails = async (paymentData, token) => {
    const { bookingId, transactionId } = paymentData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    // Note the URL format: /api/bookings/:id/pay
    const response = await axios.put(API_URL + `${bookingId}/pay`, { transactionId }, config);

    return response.data;
};


const bookingService = {
    getMyBookings,
    getSlots,
    createBooking,
    submitPaymentDetails,
};

export default bookingService;