const User = require('../models/userModel');
const RegisteredUser = require('../models/registeredUserModel');




const registration = async (req, res) => {
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
};

const myregistration = async (req, res) => {
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
}


module.exports = { 
    registration,
    myregistration,
};  