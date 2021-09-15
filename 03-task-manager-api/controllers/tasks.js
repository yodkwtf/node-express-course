// # GET ALL TASKS
const getAllTasks = (req, res) => {
  res.send('get all tasks');
};

// # CREATE A TASK
const createTask = (req, res) => {
  res.send('create task');
};

// # GET A SINGLE TASK
const getTask = (req, res) => {
  res.send('get single task');
};

// # UPDATE A TASK
const updateTask = (req, res) => {
  res.send('update task');
};

// # DELETE A TASK
const deleteTask = (req, res) => {
  res.send('delete task');
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
