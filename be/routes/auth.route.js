const express = require('express');
const router = express.Router();
const { 
  getCaptcha,
  signup,
  login,
  changePassword,
  forgotPassword,
  logout, 
  emailVerification,
} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


const User = require('../models/userModel');;
const upload = require('../middleware/multer');
const cloudinary = require("../config/cloudinary");






// Public Routes
router.get("/captcha", getCaptcha);
router.post('/signup', signup);
router.post('/login', login);
// Change Password
router.post("/change-password", authMiddleware, changePassword);
//Forgot Password
router.post('/forgot-password', forgotPassword);
router.post("/logout",authMiddleware,logout );
router.post('/email-verify', emailVerification)

router.post("/upload-profile",authMiddleware,upload.single("profileImage"),async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image file provided" });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_profiles"
    });

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: result.secure_url },
      { new: true }
    ).select("name email mobile role profileImage");

    res.status(200).json({
      message: "Profile image uploaded successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
});







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
    const user = await User
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





module.exports = router;
