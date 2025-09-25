const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const { generateToken } = require('../utils/jwt');
const { nanoid } = require('nanoid');
const svgCaptcha = require('svg-captcha');
require('dotenv').config();
const sendResponse = require('../utils/sendResponse');
const AppError = require('../utils/AppError');
const STATUS = require('../constant/statusCodes');
const { sendEmail, verifyemail, forgotPasswordEmail, credentialsEmail } = require('../services/mail');




const getCaptcha = (req, res) => {
  const captcha = svgCaptcha.create({
    size: 6,
    ignoreChars: '0o1i',
  });

  res.cookie('captcha_text', captcha.text, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 5 * 60 * 1000,
  });

  res.type('svg');
  res.status(200).send(captcha.data);
};

const signup = async (req, res, next) => {
  try {
    const { name, email, captchaInput } = req.body;

    const storedCaptcha = req.cookies.captcha_text;
    if (!storedCaptcha) {
      return next(new AppError('Captcha Not Found', STATUS.BAD_REQUEST));
    }
    if (!captchaInput || captchaInput.trim().toLowerCase() !== storedCaptcha.toLowerCase()) {
      res.clearCookie('captcha_text');
      return next(new AppError('Please Enter Valid Captcha', STATUS.BAD_REQUEST));
    }
    res.clearCookie('captcha_text');

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return next(new AppError('User with this email already exists. Please Login.', STATUS.BAD_REQUEST));
    }

    const user = new User({
      name,
      email: email.toLowerCase(),
      role: 'user',
      password: '0',
    });
    

    // --- send email via Brevo ---
    sendEmail({
      to: email,
      subject: 'WCND 2026 INDIA — Confirm Your Registration',
      html: verifyemail("http://localhost:5173/verify-email"),
    });

    await user.save();
    sendResponse(res, STATUS.CREATED, 'User created successfully and verification email sent. Please verify your email.', {});
  } catch (error) {
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
      return next(new AppError('All fields are required', STATUS.BAD_REQUEST));
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return next(new AppError('Invalid credentials', STATUS.UNAUTHORIZED));
    }

    if (!user.isVerified) {
      return next(new AppError('Email not verified', STATUS.UNAUTHORIZED));
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError('Invalid credentials', STATUS.UNAUTHORIZED));
    }

    // Generate JWT
    const token = generateToken(user._id, user.role);

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // prod = true, dev = false
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    // Set cookie
    res.cookie('auth_token', token, cookieOptions);

    sendResponse(res, STATUS.OK, 'Login successful', { user });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { newPassword } = req.body;

    // validation
    if (!newPassword || newPassword.length < 8) {
      return next(new AppError('Password must be at least 8 characters long', STATUS.BAD_REQUEST));
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // update in DB
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    sendResponse(res, STATUS.OK, 'Password changed successfully');
  } catch (err) {
    next(err);
  }
};

// Forgot Password API
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Step 1: check user exist
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return next(new AppError('User not found', STATUS.NOT_FOUND));
    }

    // Step 2: generate new random password (same as signup)
    const newPassword = uuidv4().slice(0, 8);

    // Step 3: hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4: update in DB
    user.password = hashedPassword;
    await user.save();

    // Step 5: send mail with new password
    sendEmail({
      to: email,
      subject: 'WCND 2026 INDIA — Your New Password',
      html: forgotPasswordEmail(user.name, newPassword),
    });


    sendResponse(res, STATUS.OK, 'New password sent to your email');
  } catch (err) {
    next(err);
  }
};

const logout = (req, res, next) => {
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  });

  sendResponse(res, STATUS.OK, 'Logout successful');
};

const emailVerification = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError('Email is required', STATUS.BAD_REQUEST));
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return next(new AppError('User not found', STATUS.NOT_FOUND));
    }

    if (user.isVerified) {
      return sendResponse(res, STATUS.BAD_REQUEST, 'Email already verified');
    }

    // --- generate password ---
    const plainPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // --- generate registrationId ---
    const registrationId = 'REG' + nanoid(8).toUpperCase();

    // --- update user ---
    user.isVerified = true;
    user.password = hashedPassword;
    user.registrationId = registrationId;
    await user.save();

    // --- send credentials email ---
    sendEmail({
      to: email,
      subject: 'WCND 2026 INDIA — Email Verified Successfully',
      html: credentialsEmail(registrationId, email, plainPassword),
    });


    sendResponse(res, STATUS.OK, 'Email verified successfully. Credentials sent.');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCaptcha,
  signup,
  login,
  changePassword,
  forgotPassword,
  logout,
  emailVerification,
};
