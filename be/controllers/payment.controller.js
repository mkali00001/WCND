
const Payment = require("../models/paymentModel");
const Razorpay = require('razorpay');
const User = require("../models/userModel");
const RegisteredUser = require("../models/registeredUserModel");
const crypto = require("crypto");
const paymentCategory = require("../models/paymentCategoryModel");
const sendResponse = require("../utils/sendResponse");
const STATUS = require("../constant/statusCodes");
const PDFDocument = require("pdfkit");
const nodemailer = require('nodemailer');
const streamBuffers = require("stream-buffers");
const { sendEmail, paymentConfirmationEmail} = require("../services/mail");
const cloudinary = require("cloudinary").v2;


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


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

console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET )



exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in paise
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Amount is required and must be > 0" });
    }
    console.log("amt",amount)
    // Create Razorpay order
    try{
      const order = await razorpay.orders.create({
      amount:amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    });
    console.log("1",order)
    res.status(200).json(order);
    }catch(err){
      res.status(400).json({error:"Razorpay error"})
    }
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

    // Send confirmation email
    sendEmail({
      from: process.env.EMAIL_USER,
      to: registration.email,
      subject: "WCND 2026 INDIA — Payment Confirmation & Registration Receipt",
      html: paymentConfirmationEmail(registration, payment),
    });


    res.status(201).json({ success: true, payment });
  } catch (err) {
    console.error("Error recording payment:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

exports.getPaymentCategorie = async (req, res, next) => {
  try {
    const { category } = req.body
    const categories = await paymentCategory.find({ type: category }).sort({ type: 1, name: 1 })
    return sendResponse(res, STATUS.OK, "Payment categories fetched successfully", { data: categories });
  } catch (error) {
    next(error)
  }
};

exports.getMyPayment = async (req, res, next) => {
  try {
    const userId = req.user.id;
    // Find the latest successful payment for the user
    const payment = await Payment.findOne({ user: userId, status: "Success" }).sort({ createdAt: -1 });

    // It's okay if no payment is found. Send null.
    if (!payment) {
      return res.status(200).json(null);
    }

    res.status(200).json(payment);
  } catch (error) {
    next(error);
  }
};





cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.generateInvoice = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    const registration = await RegisteredUser.findOne({ user: userId });

    if (!user || !registration) {
      return res.status(404).json({ error: "User or registration not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const bufferStream = new streamBuffers.WritableStreamBuffer({
      initialSize: 100 * 1024,
      incrementAmount: 10 * 1024,
    });

    doc.pipe(bufferStream);

    doc.fontSize(20).text("World Congress of Natural Democracy WCND 2026 INDIA", {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(16).text("Official Invoice / Registration Receipt", { align: "center" });
    doc.moveDown();

    doc.fontSize(12).text(`Invoice Number: ${user.registrationId || "WCND-INV-2026-XXXX"}`);
    doc.text(`Date of Payment: ${new Date().toLocaleDateString()}`);
    doc.text(`Participant Name: ${registration.fullName || user.name}`);
    doc.text(`Email: ${registration.email || user.email}`);
    doc.text(`Country: ${registration.country || registration.otherCountry || "N/A"}`);
    doc.text(`Participation Category: ${registration.participantType || "N/A"}`);
    doc.moveDown();

    doc.text("Payment Details:", { underline: true });
    doc.text(
      `Registration Fee Amount: ${registration.feeAmount || "N/A"} ${registration.participantType === "International" ? "USD" : "INR"
      }`
    );
    doc.text(`Payment Method: ${registration.paymentMode || "N/A"}`);
    doc.text(`Payment Status: Paid`);
    doc.moveDown();

    doc.font("Helvetica-Oblique").text(
      "This is an official receipt confirming that the registration fee for WCND 2026 INDIA has been successfully received. Please retain this invoice for your records.",
      { align: "center" }
    );

    doc.end();

    bufferStream.on("finish", async () => {
      const pdfBuffer = bufferStream.getContents();

      const base64PDF = `data:application/pdf;base64,${pdfBuffer.toString('base64')}`;

      try {
        const uploadResult = await cloudinary.uploader.upload(base64PDF, {
          resource_type: "raw",
          public_id: `WCND_Invoice_${user.registrationId || Date.now()}`,
          use_filename: true,
          unique_filename: false,
        });

        registration.billingInvoiceDetails = uploadResult.secure_url;
        await registration.save();

        return res.status(200).json({
          success: true,
          message: "Invoice uploaded and URL saved successfully",
          url: uploadResult.secure_url,
        });

      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ error: "Failed to upload PDF to Cloudinary" });
      }
    });
  } catch (err) {
    console.error("Error generating/uploading invoice:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};



exports.downloadInvoice = async (req, res) => {
  try {
    const registration = await RegisteredUser.findOne({ user: req.user.id });
    if (!registration || !registration.billingInvoiceDetails) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    const axios = require('axios');
    const fileUrl = registration.billingInvoiceDetails;

    try {
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream'
      });

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="WCND_Invoice_${registration.fullName || 'invoice'}.pdf"`);
      res.setHeader('Content-Length', response.headers['content-length']);

      response.data.pipe(res);

    } catch (fetchError) {
      console.error('Error fetching PDF from Cloudinary:', fetchError);
      return res.status(500).json({ error: "Failed to fetch PDF file" });
    }

  } catch (err) {
    console.error("Error downloading invoice:", err);
    res.status(500).json({ error: "Server error" });
  }
};