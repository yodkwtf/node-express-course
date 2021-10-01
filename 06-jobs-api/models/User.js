const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

// # HASHING THE PASSWORD
UserSchema.pre('save', async function () {
  // no. of random bytes
  const salt = await bcrypt.genSalt(10);
  // hash password
  this.password = await bcrypt.hash(this.password, salt);
});

// # INSTANCE METHOD FOR CREATING JWT TOKEN
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// # INSTANCE METHOD FOR COMPARING PASSWORDS
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
