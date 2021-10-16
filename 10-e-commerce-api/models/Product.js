const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please provide product name'],
    maxlength: [100, 'Product name cannot be more than 100 characters'],
  },

  price: {
    type: Number,
    required: [true, 'Please provide product price'],
    default: 0,
  },

  description: {
    type: String,
    required: [true, 'Please provide product description'],
    maxlength: [1000, 'Description cannot be more than 100 characters'],
  },
});
