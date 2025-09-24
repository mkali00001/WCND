// models/paymentCategoryModel.js
const mongoose = require("mongoose");

const paymentCategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Domestic", "International"], 
      required: true,
    },
    feeINR: {
      type: Number,
      default: 0,
    },
    feeUSD: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const PaymentCategory = mongoose.model("PaymentCategory", paymentCategorySchema);

module.exports = PaymentCategory;
