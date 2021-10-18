const mongoose = require('mongoose');

// Product Schema
const ProductSchema = new mongoose.Schema(
  {
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

    image: {
      type: String, // image src
      default: '/uploads/example.jpeg',
    },

    category: {
      type: String,
      required: [true, 'Please provide product category'],
      enum: ['office', 'kitchen', 'bedroom'],
    },

    company: {
      type: String,
      required: [true, 'Please provide product company'],
      enum: {
        values: ['ikea', 'liddy', 'marcos'],
        message: '{VALUE} is not supported',
      },
    },

    colors: {
      type: [String],
      default: ['#222'],
      required: true,
    },

    featured: {
      type: Boolean,
      default: false, // displayed on frontend
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    inventory: {
      type: Number,
      required: true,
      default: 50, // stock
    },

    averageRating: {
      type: Number,
      default: 0, // will be calculated dynamically
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User', // access to admin user
      required: true,
    },
  },

  { timestamps: true } // createdAt and all that
);

module.exports = mongoose.model('Product', ProductSchema);
