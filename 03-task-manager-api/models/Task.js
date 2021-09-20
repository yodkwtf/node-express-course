const mongoose = require('mongoose');

const TaskSchema = new mongoose({
  name: String,
  completed: Boolean,
});

module.exports = mongoose.model('Task', TaskSchema);
