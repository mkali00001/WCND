const userModel = require("../models/userModel");

const editUser = async (req, res) => {
  const { id } = req.params;   
  const updates = req.body;  

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: updates },       
      { new: true, runValidators: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { editUser };
