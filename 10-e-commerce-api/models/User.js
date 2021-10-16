const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },

  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 3,
  },

  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

//# hash password before saving the document
UserSchema.pre('save', async function () {
  // if password isnt't modified don't hash it
  if (!this.isModified('password')) return;

  // gen no. of rounds
  const salt = await bcrypt.genSalt(10);

  // hash the pass
  this.password = await bcrypt.hash(this.password, salt);
});

//# instance method to compare password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
