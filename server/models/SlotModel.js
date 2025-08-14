const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const slotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  capacity: { type: Number, required: true }, 
  bookingsCount: { type: Number, default: 0 }
});

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
