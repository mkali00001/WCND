const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kaif.tryidoltech@gmail.com",
    pass: "aszs hilz ojyy jurj"
  }
});

// Forgot Password API
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Step 1: check user exist
    const user = await User.findOne({ email:email.toLowerCase() });
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

module.exports = { forgotPassword };
