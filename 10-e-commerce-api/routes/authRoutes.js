const express = require('express');
const router = express.Router();

const { register, login, logout } = require('../controllers/authController');

//# REGISTER
router.post('/register', register);

//# LOGIN
router.post('/login', login);

//# LOGOUT
router.get('/logout', logout);

module.exports = router;
