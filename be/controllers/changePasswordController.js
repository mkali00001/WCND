const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

// Change Password Controller
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

module.exports = { changePassword };
