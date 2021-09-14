const express = require('express');
const router = express.Router();
// controllers
const { getAllTasks } = require('../controllers/tasks');

// # GET ALL TASKS
// router.get('/', getAllTasks);
router.route('/').get(getAllTasks);

module.exports = router;
