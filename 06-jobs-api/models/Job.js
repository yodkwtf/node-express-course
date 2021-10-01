const mongoose = require('mongoose');

// create job schema
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxLength: 50,
    },

    position: {
      type: String,
      required: [true, 'Please provide position'],
      maxLength: 100,
    },

    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },

    createdBy: {
      // mongoose id
      type: mongoose.Types.ObjectId, // tying our job model to user model
      // which model to reference
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
