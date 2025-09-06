const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { login } = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware'); // JWT verify
const roleMiddleware = require('../middleware/roleMiddleware'); // Role check
const userModel = require('../models/userModel');

// Public Routes
router.post('/signup', signup);
router.post('/login', login);

// Protected Route (only logged-in users)
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Welcome to your profile',
    user: req.user, // { id, role } middleware se milega
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
    message: 'Welcome Admin 👑',
  });
});

router.get('/me', authMiddleware, async (req, res) => {
    const user = await userModel.findById(req.user.id).select("name email mobile role")

  res.status(200).json(
    user
  );
});

router.post("/logout",(req,res)=>{
  res.clearCookie("auth_token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });
    return res.status(200).json({message:"Logged out"})
})

module.exports = router;
