const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { generateToken } = require('../utils/jwt');
const { nanoid } = require('nanoid');
require('dotenv').config();
const verificationLink = "some link"

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const signup = async (req, res) => {
  try {
    const { name, email, mobile, captchaInput } = req.body;

    // --- CAPTCHA verification (cookie-based) ---
    const storedCaptcha = req.cookies?.captcha_text;
    if (!storedCaptcha) {
      return res.status(400).json({ message: "Captcha missing or expired" });
    }
    if (!captchaInput || captchaInput.trim() !== storedCaptcha) {
      res.clearCookie("captcha_text");
      return res.status(400).json({ message: "Captcha verification failed" });
    }
    res.clearCookie("captcha_text");

    // --- check existing user ---
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists Please Login" });
    }

    // --- generate password ---
    const plainPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // --- generate registrationId ---
    const registrationId = "REG" + nanoid(8).toUpperCase();
    // --- create user ---
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: "user",
      registrationId
    });
    await user.save();

    // --- send email ---
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "WCND 2026 INDIA — Confirm Your Registration",
        html: `
    <p>Dear Participant,</p>
    <p>Welcome to the <strong>World Congress of Natural Democracy 2026 India</strong>.</p>
    <p>To complete your registration, please verify your email address by clicking the secure link below:</p>
    <p>
      <a href="${verificationLink}" style="display:inline-block;padding:10px 20px;background:#007BFF;color:#fff;text-decoration:none;border-radius:5px;">
        Verify My WCND Account
      </a>
    </p>

    <h4>Your Login Credentials</h4>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${plainPassword}</p>

    <h4>Security Note</h4>
    <p>This verification link and password will expire within 24 hours.</p>
    <p>If you did not initiate this registration, please disregard this message.</p>
    <br/>
    <p>We look forward to your active participation in the inaugural <strong>World Congress of Natural Democracy</strong> — a historic global gathering.</p>
    <p>Warm regards,<br/>WCND 2026 India Secretariat</p>
  `,
      });


    } catch (mailError) {
      console.error("Email send error:", mailError);
    }

    // --- create JWT cookie ---
    const token = generateToken(user._id, user.role);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "User registered successfully & credentials sent to email",
      registrationId
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { signup };