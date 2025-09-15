const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { login } = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const userModel = require('../models/userModel');
const RegisteredUser = require('../models/registeredUserModel');
const User = require('../models/userModel');
const { forgotPassword } = require('../controllers/forgotPasswordController');
const { changePassword } = require('../controllers/changePasswordController');
const { customAlphabet } = require("nanoid");
const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const { getCaptcha } = require("../controllers/captchaController");

const nanoid = customAlphabet(alphabet, 8);

async function generateUniqueRegistrationId() {
  let registrationId;
  let exists = true;

  while (exists) {
    registrationId = "REG" + nanoid().toUpperCase(); // e.g. REG4X9KQZ
    exists = await RegisteredUser.findOne({ registrationId });
  }

  return registrationId;
}
// Public Routes
router.get("/captcha", getCaptcha);
router.post('/signup', signup);
router.post('/login', login);

// Protected Route (only logged-in users)
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Welcome to your profile',
    user: req.user,
  });
});

router.get('/dashboard', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Welcome to the dashboard',
    user: req.user,
  });
});

// Admin-only Route
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
  res.json({
    message: 'Welcome Admin',
  });
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("name email mobile role isRegistered");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/register", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Check if already registered
    const existing = await RegisteredUser.findOne({ user: userId });
    if (existing) {
      return res.status(400).json({ error: "User already registered" });
    }

    const formData = req.body;

    // generate unique registrationId
    const registrationId = await generateUniqueRegistrationId();

    const registeredUser = new RegisteredUser({
      user: userId,
      registrationId, // auto-generated here
      ...formData,
    });

    await registeredUser.save();
    await User.findByIdAndUpdate(userId, { isRegistered: true });

    res.status(201).json({
      message: "Registration successful",
      registeredUser,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(400).json({ error: err.message });
  }
});



router.get("/my-registration", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const registration = await RegisteredUser.findOne({ user: userId });

    if (!registration) {
      return res.status(404).json({ error: "No registration found for this user" });
    }

    res.status(200).json(registration);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// Change Password
router.post("/change-password", authMiddleware, changePassword);


//Forgot Password
router.post('/forgot-password', forgotPassword);


router.post("/logout", (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  });

  return res.status(200).json({ message: "Logged out" });
});

module.exports = router;
