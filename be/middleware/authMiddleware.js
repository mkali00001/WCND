const jwt = require('jsonwebtoken');
require('dotenv').config();
const STATUS = require('../constant/statusCodes');
const AppError = require('../utils/AppError');

const authMiddleware = (req, res, next) => {
  // console.log(req)
  const token = req.cookies.auth_token;
  if (!token) {
    return next(new AppError('Unauthorized', STATUS.UNAUTHORIZED))
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    return next(new AppError('Unauthorized', STATUS.UNAUTHORIZED))
  }
};

module.exports = authMiddleware;
