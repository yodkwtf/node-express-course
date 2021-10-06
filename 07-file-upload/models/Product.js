const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String, // path
    required: true,
  },
});

// export Schema
module.exports = mongoose.model('Product', ProductSchema);
