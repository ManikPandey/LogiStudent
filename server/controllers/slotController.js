const Slot = require('../models/SlotModel');

// @desc    Get all available slots
// @route   GET /api/slots
// @access  Public
const getAvailableSlots = async (req, res) => {
    try {
        // Find slots that are not yet at full capacity
        const slots = await Slot.find({ $expr: { $lt: ['$bookingsCount', '$capacity'] } });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
const createSlot = async (req, res) => {
    const { startTime, endTime, capacity } = req.body;
    try {
        const slot = new Slot({ startTime, endTime, capacity });
        const createdSlot = await slot.save();
        res.status(201).json(createdSlot);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// UPDATE THE EXPORT
module.exports = { getAvailableSlots, createSlot };