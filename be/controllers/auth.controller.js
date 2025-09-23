const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { generateToken } = require('../utils/jwt');
const { nanoid } = require('nanoid');
const svgCaptcha = require("svg-captcha");
require('dotenv').config();
const { sendResponse } = require('../utils/sendResponse');
const AppError = require('../utils/AppError');
const { STATUS } = require('../constant/statusCodes');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});


const getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: "0o1i",
  });

  res.cookie("captcha_text", captcha.text, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 5 * 60 * 1000,
  });

  res.type("svg");
  res.status(200).send(captcha.data);
};

const signup = async (req, res,next) => {
  try {
    const { name, email, captchaInput } = req.body;

    // --- CAPTCHA verification (cookie-based) ---
    const storedCaptcha = req.cookies?.captcha_text;

    if (!storedCaptcha) {
      return res.status(400).json({ message: "Captcha missing or expired" });
    }
    // console.log(storedCaptcha);
    if (!captchaInput || captchaInput.trim().toLowerCase() !== storedCaptcha.toLowerCase()) {
      res.clearCookie("captcha_text");
      return res.status(400).json({ message: "Captcha verification failed! Please enter valid captcha" });
    }
    res.clearCookie("captcha_text");

    // --- check existing user ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const message = "User with this email already exists. Please Login.";
      return res.status(400).json({ message });
    }

    // --- generate password ---
    const plainPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // --- generate registrationId ---
    const registrationId = "REG" + nanoid(8).toUpperCase();
    // --- create user ---
    const user = new User({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
      registrationId
    });
    await user.save();

    // --- send email ---
    try {
      transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "WCND 2026 INDIA — Confirm Your Registration",
        html: `
    <p>Dear Participant,</p>
    <p>Welcome to the <strong>World Congress of Natural Democracy 2026 India</strong>.</p>
   

    <h4>Your Login Credentials</h4>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${plainPassword}</p>

    <h4>Security Note</h4>
    
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
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    sendResponse(res, STATUS.CREATED, "User created successfully", {registrationId});

  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials please check your email or password" });
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // prod = true, dev = false
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Set cookie
    res.cookie("auth_token", token, cookieOptions);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    // validation
    if (!newPassword || newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update in DB
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Change password error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password API
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Step 1: check user exist
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: generate new random password (same as signup)
    const newPassword = uuidv4().slice(0, 8);

    // Step 3: hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: update in DB
    user.password = hashedPassword;
    await user.save();

    // Step 5: send mail with new password
    await transporter.sendMail({
      from: "kaif.tryidoltech@gmail.com",
      to: email,
      subject: "Your New Password",
      text: `Hello ${user.name},\n\nYour new password is: ${newPassword}\n\nLogin link: http://localhost:5173/login`
    });

    res.status(200).json({ message: "New password generated & sent to your email" });

  } catch (err) {
    console.error("Forgot password error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};



const logout = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  return res.status(200).json({ message: "Logged out" });
}


const emailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getCaptcha,
  signup,
  login,
  changePassword,
  forgotPassword,
  logout,
  emailVerification,
};