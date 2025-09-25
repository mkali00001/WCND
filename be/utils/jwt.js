const jwt = require('jsonwebtoken');
require('dotenv').config();

const expiresIn = process.env.JWT_EXPIRES_IN;
const jwtsecret = process.env.JWT_SECRET;

const generateToken = (id, role) => {
  return jwt.sign({ id: id, role }, jwtsecret, { expiresIn: expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, jwtsecret);
};

module.exports = { generateToken, verifyToken };
