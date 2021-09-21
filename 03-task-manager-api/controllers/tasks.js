const Task = require('../models/Task');

// # GET ALL TASKS
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// # CREATE A TASK
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// # GET A SINGLE TASK
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    // if item doesnt exist
    if (!task) {
      return res.status(404).json({ msg: `No task with id - ${taskID} found` });
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// # UPDATE A TASK
const updateTask = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

// # DELETE A TASK
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
      return res.status(404).json({ msg: `No task with id - ${taskID} found` });
    }

    res.status(200).json({ task });
    // res.status(200).json({ task: null, status: 'success' });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
