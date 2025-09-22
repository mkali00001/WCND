const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  systemPaymentId: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    trim: true
  },

  orderId: {
    type: String,
    required: true,
    unique: true
  },

  razorpayPaymentId: {
    type: String,
    required: true,
    unique: true
  },

  amount: {
    type: Number,
    required: true
  },

  currency: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["Success", "Pending", "Failed"], 
    required: true
  },

  method: {
    type: String,
    required: true
  },

  dateTime: {
    type: Date,
    default: Date.now
  }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
