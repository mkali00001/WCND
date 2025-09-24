
const Payment = require("../models/paymentModel");
const Razorpay = require('razorpay');
const RegisteredUser = require("../models/registeredUserModel");
const crypto = require("crypto");
const paymentCategory = require("../models/paymentCategoryModel");
const { sendResponse } = require("../utils/sendResponse");
const { STATUS } = require("../constant/statusCodes");




exports.createPayment = async (req, res) => {
  try {
    const payload = req.body;

    const required = [
      "systemPaymentId",
      "user",
      "email",
      "orderId",
      "razorpayPaymentId",
      "amount",
      "currency",
      "status",
      "method"
    ];
    for (let f of required) {
      if (!payload[f]) {
        return res.status(400).json({ error: `${f} is required` });
      }
    }

    const payment = new Payment(payload);
    await payment.save();

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment
    });
  } catch (err) {
    console.error("Error creating payment:", err);

    if (err.code === 11000) {
      return res.status(409).json({
        error: "Duplicate key",
        details: err.keyValue
      });
    }

    res.status(500).json({ error: "Server error" });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const { status, user, start, end, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (user) query.user = user;

    if (start || end) {
      query.dateTime = {};
      if (start) query.dateTime.$gte = new Date(start);
      if (end) query.dateTime.$lte = new Date(end);
    }

    const skip = (Math.max(1, parseInt(page)) - 1) * Math.max(1, parseInt(limit));
    const payments = await Payment.find(query)
      .sort({ dateTime: -1 })
      .skip(skip)
      .limit(Math.max(1, parseInt(limit)));

    const total = await Payment.countDocuments(query);

    res.json({
      success: true,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      data: payments
    });
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,       // Public key
  key_secret: process.env.RAZORPAY_KEY_SECRET // Secret key
});


exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount is required and must be > 0" });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });

    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.recordPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, amount } = req.body;

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature || !amount) {
      return res.status(400).json({ error: "Missing required payment details" });
    }

    // Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    if (generated_signature !== razorpaySignature) {
      return res.status(400).json({ error: "Payment verification failed" });
    }

    // Fetch user registration for email
    const registration = await RegisteredUser.findOne({ user: userId });
    if (!registration) return res.status(404).json({ error: "Registration not found" });

    // Save payment
    const payment = new Payment({
      user: userId,
      systemPaymentId: razorpayPaymentId,
      email: registration.email,
      orderId: razorpayOrderId,
      razorpayPaymentId,
      amount,
      currency: "INR",
      status: "Success",
      method: "Razorpay"
    });

    await payment.save();
    res.status(201).json({ success: true, payment });
  } catch (err) {
    console.error("Error recording payment:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.getPaymentCategorie = async (req, res, next) => {
  try {
    const { category } = req.body
    const categories = await paymentCategory.find({type : category}).sort({ type: 1, name: 1 })
    sendResponse(res, STATUS.OK, "Payment categories fetched successfully", { data: categories });
  } catch (error) {
    next(error)
  }
};