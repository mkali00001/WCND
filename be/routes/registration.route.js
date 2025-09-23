const express = require("express");
const registerRouter = express.Router();

const { registration, myregistration } = require("../controllers/register.controller");
const authMiddleware = require("../middleware/authMiddleware");

registerRouter.use(authMiddleware);

registerRouter.post("/register", registration);
registerRouter.get("/my-registration",  myregistration);


module.exports = registerRouter;