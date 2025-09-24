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
      sendResponse(res,STATUS.BAD_REQUEST,"Captcha not found")
    }
    // console.log(storedCaptcha);
    if (!captchaInput || captchaInput.trim().toLowerCase() !== storedCaptcha.toLowerCase()) {
      res.clearCookie("captcha_text");
      sendResponse(res,STATUS.BAD_REQUEST,"Captcha verification failed! Please enter valid captcha")  
    }
    res.clearCookie("captcha_text");

    // --- check existing user ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      const message = "User with this email already exists. Please Login.";
      sendResponse(res, STATUS.CONFLICT, message);
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
      next(mailError)
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
    sendResponse(res, STATUS.INTERNAL_SERVER_ERROR, error.message);
  }
};

const login = async (req, res,next) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      sendResponse(res, STATUS.BAD_REQUEST, "Please provide email and password");
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      sendResponse(res, STATUS.NOT_FOUND, "User not found");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      sendResponse(res, STATUS.UNAUTHORIZED, "Invalid credentials");
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
    next(error)
  }
};

const changePassword = async (req, res,next) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    // validation
    if (!newPassword || newPassword.length < 8) {
      sendResponse(res, STATUS.BAD_REQUEST, "New password must be at least 8 characters long");    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update in DB
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    sendResponse(res, STATUS.OK, "Password changed successfully");
  } catch (err) {
    next(err)
  }
};

// Forgot Password API
const forgotPassword = async (req, res,next) => {
  try {
    const { email } = req.body;

    // Step 1: check user exist
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      sendResponse(res, STATUS.NOT_FOUND, "User not found");
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

    sendResponse(res, STATUS.OK, "New password sent to your email");

  } catch (err) {
    next(err) 
  }
};



const logout = (req, res, next) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  sendResponse(res, STATUS.OK, "Logout successful");
}


const emailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      sendResponse(res, STATUS.BAD_REQUEST, "Email is required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      sendResponse(res, STATUS.NOT_FOUND, "User not found");
    }

    if (user.isVerified) {
      sendResponse(res, STATUS.BAD_REQUEST, "Email already verified");
    }
    user.isVerified = true;
    await user.save();

    sendResponse(res, STATUS.OK, "Email verified successfully");
  } catch (error) {
    next(error)
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