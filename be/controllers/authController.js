const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid'); 
const nodemailer = require('nodemailer');
const axios = require('axios');
const { generateToken } = require('../utils/jwt');
require('dotenv').config();

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kaif.tryidoltech@gmail.com",
    pass: "aszs hilz ojyy jurj" 
  }
});

const signup = async (req, res) => {
  try {
    const { name, email, mobile, captchaToken } = req.body;

    // STEP 1: Captcha verify
    if (!captchaToken) {
      return res.status(400).json({ message: 'Captcha token missing' });
    }

    const verifyRes = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null, // no body, params used instead
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captchaToken,
        },
      }
    );

    if (!verifyRes.data.success) {
      return res.status(400).json({ message: 'Captcha verification failed' });
    }

    // STEP 2: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate random password
    const plainPassword = uuidv4().slice(0, 8);

    // Encrypt password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Save user
    const user = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role: 'user'
    });
    await user.save();

    // Send mail with credentials
    await transporter.sendMail({
      from: "kaif.tryidoltech@gmail.com",
      to: email,
      subject: "Your Login Credentials",
      text: `Hello ${name},\n\nYour account has been created.\nEmail: ${email}\nPassword: ${plainPassword}\n\nLogin link: http://localhost:5173/login`
    });
    console.log(user)
    const token = generateToken(user._id, user.role)
    res.cookie("auth_token",token,{
      httpOnly:true,
      secure:false,
      sameSite:"lax",
      maxAge:7*24*60*60*1000
    })

    res.status(201).json({
      message: 'User registered successfully & credentials sent to email'
    });

  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { signup };
