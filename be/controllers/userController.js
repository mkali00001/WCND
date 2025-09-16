const cloudinary = require("../config/cloudinary");
const User = require("../models/userModel");

// Profile Image Upload
const uploadProfileImage = async (req, res) => {
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
};

module.exports = { uploadProfileImage };
