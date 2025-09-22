const RegisteredUser = require("../models/registeredUserModel")
const userModel = require("../models/userModel")

const users = async (req, res) => {
    const users = await userModel.find({ role: "user" })
    // console.log(users)
    res.send(users)
}


const users_registration_data = async (req, res) => {
  const userId = req.params.id;

  try {
    const registrationData = await RegisteredUser.findOne({ user: userId });
    if (!registrationData) {
      return res.status(404).json({ error: "No registration data found for this user." });
    }
    res.json(registrationData);
  } catch (error) {
    console.log("Error in fetching users registration:", error);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
    users,
    users_registration_data
}