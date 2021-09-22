const mongoose = require('mongoose');

// # PRODUCT MODEL [STRUCTURE]
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
  },

  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },

  featured: {
    type: Boolean,
    default: false,
  },

  rating: {
    type: Number,
    default: 4.5,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  company: {
    type: String,
    // 👇🏼 limiting the options to choose from
    // enum: ['ikea', 'liddy', 'caressa', 'marcos'],
    enum: {
      values: ['ikea', 'liddy', 'caressa', 'marcos'],
      message: '{VALUE} is not supported', // error for custom value requested
    },
  },
});

module.exports = mongoose.model('Product', productSchema);
