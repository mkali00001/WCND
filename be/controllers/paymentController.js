
const Payment = require("../models/paymentModel");

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
