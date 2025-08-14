const Booking = require('../models/BookingModel');
const Slot = require('../models/SlotModel'); // We need the Slot model to update it

// @desc    Get all bookings from all users
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getAllBookings = async (req, res) => {
    try {
        // We use .populate() to get the name and email from the linked User document
        const bookings = await Booking.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a booking's status
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        const newStatus = req.body.status;

        if (booking) {
            const oldStatus = booking.status; // Store the old status before changing it
            booking.status = newStatus || oldStatus;

            // --- NEW LOGIC FOR CANCELLATION ---
            // If the booking is being moved TO 'Cancelled' FROM a state that occupied a slot
            if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
                const slot = await Slot.findById(booking.pickupSlot);
                if (slot) {
                    slot.bookingsCount = Math.max(0, slot.bookingsCount - 1); // Decrement, ensuring it doesn't go below 0
                    await slot.save();
                }
            }
            // --- END OF NEW LOGIC ---
            

            const updatedBooking = await booking.save();
            // After saving, re-populate the 'user' field before sending it back
            const populatedBooking = await Booking.findById(updatedBooking._id).populate('user', 'name email');
            res.json(populatedBooking);
            
            res.json(updatedBooking);
        } else {
            res.status(404).json({ message: 'Booking not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a slot
// @route   DELETE /api/admin/slots/:id
// @access  Private/Admin
const deleteSlot = async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.id);

        if (slot) {
            // A simple check to prevent deleting a slot that has active bookings
            if (slot.bookingsCount > 0) {
                return res.status(400).json({ message: 'Cannot delete a slot with active bookings. Please cancel or reassign bookings first.' });
            }
            await slot.remove();
            res.json({ message: 'Slot removed' });
        } else {
            res.status(404).json({ message: 'Slot not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getAllBookings,
    updateBookingStatus,
    deleteSlot,
};