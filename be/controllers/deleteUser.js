const userModel = require("../models/userModel")

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


module.exports = { deleteUser }