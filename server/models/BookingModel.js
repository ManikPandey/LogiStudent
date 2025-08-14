const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    type: { type: String, required: true }, 
    quantity: { type: Number, required: true, default: 1 }
  }],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending Payment', 'Pending Confirmation', 'Confirmed', 'In Storage', 'Out for Delivery', 'Delivered', 'Cancelled'], 
    default: 'Pending Payment'
  },
  pickupSlot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true },
  paymentDetails: {
    paymentId: { type: String },
    status: { type: String, default: 'Pending' },
    method: { type: String, default: 'UPI' }
  },
  adminNotes: { type: String } 
}, { timestamps: true });


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;