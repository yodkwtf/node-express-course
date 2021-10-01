const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// create a schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, 'Please provide a name'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true, // not a validator, just creates a unique index
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
});

UserSchema.pre('save', async function () {
  // no. of random bytes
  const salt = await bcrypt.genSalt(10);
  // hash password
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
