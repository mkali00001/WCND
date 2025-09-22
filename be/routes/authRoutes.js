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
const { getCaptcha } = require("../controllers/captchaController");
const { uploadProfileImage } = require('../controllers/userController');
const upload = require('../middleware/multer');
const { emailVerification } = require('../controllers/emailVerificationController');
const { createPayment, getPayments, createOrder, recordPayment, get_payment_status } = require('../controllers/paymentController');
const { users, users_registration_data } = require('../controllers/usersController');
const { deleteUser } = require('../controllers/deleteUser');
const { editUser } = require('../controllers/editUser');





// Public Routes
router.get("/captcha", getCaptcha);
router.post('/signup', signup);
router.post('/login', login);

router.post('/email-verify', emailVerification)

router.patch('/edit-user/:id', authMiddleware, roleMiddleware(['admin']), editUser)
router.get("/users", authMiddleware, roleMiddleware(['admin']), users)
router.get("/users-registration/:id", authMiddleware, roleMiddleware(['admin']), users_registration_data)
router.delete("/delete-user/:id", authMiddleware, roleMiddleware(['admin']), deleteUser)
router.get("/paymentstatus",authMiddleware, roleMiddleware(['admin']), get_payment_status)



router.post("/create-order",authMiddleware,createOrder)
router.post("/record-payment",authMiddleware,recordPayment)
router.post('/create-payment', authMiddleware, createPayment)
router.get('/get-payment', authMiddleware,  getPayments)

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
      .select("name email mobile role isRegistered registrationId profileImage isVerified");

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

    const registeredUser = new RegisteredUser({
      user: userId,
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

router.post(
  "/upload-profile",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

module.exports = router;
