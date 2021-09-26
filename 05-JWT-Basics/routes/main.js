const express = require('express');
const router = express.Router();

// get controller functions
const { login, dashboard } = require('../controllers/main');

//# show dashboard
router.get('/dashboard', dashboard);

//# get login details
router.post('/login', login);

module.exports = router;
