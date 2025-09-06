const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id, role)=>{
    return jwt.sign(
          { id: id, role }, 
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
}

const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {generateToken, verifyToken}