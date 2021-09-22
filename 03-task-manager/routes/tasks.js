const express = require('express');
const router = express.Router();
// controllers
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks');

// # GET ALL TASKS
router.get('/', getAllTasks);

// # CREATE A TASK
router.post('/', createTask);

// # GET A SINGLE TASK
router.get('/:id', getTask);

// # UPDATE A TASK
router.patch('/:id', updateTask);

// # DELETE A TASK
router.delete('/:id', deleteTask);

module.exports = router;
