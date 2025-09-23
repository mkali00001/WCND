const express = require("express")
const adminRouter = express.Router()

const { users, users_registration_data, deleteUser, editUser, get_payment_status, } = require("../controllers/admin.controller")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

adminRouter.use(authMiddleware, roleMiddleware(["admin"]));



adminRouter.patch('/edit-user/:id',  editUser)
adminRouter.get("/users",  users)
// adminRouter.get("/users-registration/:id",  users_registration_data)
adminRouter.delete("/delete-user/:id",  deleteUser)
adminRouter.get("/paymentstatus", get_payment_status)


module.exports = adminRouter