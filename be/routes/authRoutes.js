const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/authController');
const { login } = require('../controllers/loginController');


// POST /api/signup
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
