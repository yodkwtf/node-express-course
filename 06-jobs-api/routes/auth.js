const express = require('express');
const router = express.Router();

const { login, register } = require('../controllers/auth');

// # REGISTER USER
router.post('/register', register);

// # LOGIN USER
router.post('/login', login);

module.exports = router;
