const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

// # GET ALL TASKS
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });

  // - Mulitple ways of response
  // res.status(200).json({ tasks, amount: tasks.length });
  // res.status(200).json({ success: true, data: { tasks } });
  // res.status(200).json({ status: "success", data: { tasks } });
});

// # CREATE A TASK
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// # GET A SINGLE TASK
const getTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  // if item doesnt exist
  if (!task) {
    return res.status(404).json({ msg: `No task with id - ${taskID} found` });
  }

  res.status(200).json({ task });
});

// # UPDATE A TASK
const updateTask = asyncWrapper(async (req, res) => {
  // get id
  const { id: taskID } = req.params;

  // update task (validation, body for update, options object)
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true, //return updated item
    runValidators: true, // check validations for schema
  });

  // if item doesnt exist
  if (!task) {
    return res.status(404).json({ msg: `No task with id - ${taskID} found` });
  }

  // if successfull
  res.status(200).json({ task });
});

// # DELETE A TASK
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return res.status(404).json({ msg: `No task with id - ${taskID} found` });
  }

  res.status(200).json({ task });
  // res.status(200).json({ task: null, status: 'success' });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
