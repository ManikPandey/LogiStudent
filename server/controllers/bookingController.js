const Booking = require('../models/BookingModel');
const Slot = require('../models/SlotModel'); 

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    const { items, totalPrice, pickupSlot } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No items in booking' });
    }

    try {
        const booking = new Booking({
            user: req.user._id, // from the 'protect' middleware
            items,
            totalPrice,
            pickupSlot,
        });

        const createdBooking = await booking.save();
        const slot = await Slot.findById(pickupSlot);
        if (slot) {
            slot.bookingsCount = (slot.bookingsCount || 0) + 1; // Safely increment
            await slot.save();
        } else {
            console.warn(`Warning: Booking created for a non-existent slot ID: ${pickupSlot}`);
        }
        // --- BACKEND CHECKPOINT ---
        console.log('--- BACKEND CHECKPOINT --- Sending this booking object as response:', createdBooking);
        // -------------------------
        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// @desc    Get bookings for logged in user
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const submitPaymentDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (booking) {
            // Ensure the user owns this booking
            if (booking.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            
            booking.status = 'Pending Confirmation';
            booking.paymentDetails.paymentId = req.body.transactionId;
            booking.paymentDetails.status = 'Paid';

            const updatedBooking = await booking.save();
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { createBooking, getMyBookings, submitPaymentDetails };