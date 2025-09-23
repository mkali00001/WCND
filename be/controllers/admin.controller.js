const Payment = require("../models/paymentModel")
const RegisteredUser = require("../models/registeredUserModel")
const userModel = require("../models/userModel")

const users = async (req, res) => {
  try {
    // Pagination params
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // For total count (for pagination)
    const totalUsers = await userModel.countDocuments({ role: 'user' });

    // Paginated fetch
    const usersData = await userModel.find({ role: 'user' })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // For each user, look up their registrationData
    const merged = await Promise.all(
      usersData.map(async user => {
        const registrationData = await RegisteredUser.findOne({ user: user._id }).lean();
        return {
          ...user.toObject(),
          registrationData: registrationData || null,
        };
      })
    );

    // Respond with paginated format
    res.json({
      users: merged,
      pagination: {
        currentPage: page,
        limit,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};



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

const deleteUser = async (req, res) => {
    const { id } = req.params
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

const get_payment_status = async (req, res) => {
  try {
    let { page = 1, limit = 10, status, from, to, user } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (status) filter.status = status;
    if (user) filter.user = user;
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);

    // Count total payments matching the filter
    const totalPayments = await Payment.countDocuments(filter);

    // Get paginated payments
    const payments = await Payment.find(filter)
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      payments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPayments / limit),
        totalPayments,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

module.exports = {
    users,
    users_registration_data,
    deleteUser,
    get_payment_status,
    editUser,
}