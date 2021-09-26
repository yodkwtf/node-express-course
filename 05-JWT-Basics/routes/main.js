const express = require('express');
const router = express.Router();

// get controller functions
const { login, dashboard } = require('../controllers/main');

// get auth middleware
const authMiddleware = require('../middleware/auth');

//# show dashboard
router.get('/dashboard', authMiddleware, dashboard);

//# get login details
router.post('/login', login);

module.exports = router;
