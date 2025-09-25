const mongoose = require('mongoose');

const paymentCategorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Domestic', 'International'],
      required: true,
      immutable: true,
    },
    feeINR: { type: Number, default: 0 },
    feeUSD: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PaymentCategory', paymentCategorySchema);

// const mappingINR = {
//   "Student UG/PG": 2000,
//   "Research Scholar": 4000,
//   "Faculty/Professional/Activist": 7000,
//   "Accompanying Person": 10500,
// }
// const mappingUSD = {
//   "International Delegate": 200,
//   "Accompanying Person": 200,
// }
