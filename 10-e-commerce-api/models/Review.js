const mongoose = require('mongoose');

// Review Schema
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },

    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 50,
    },

    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User', // access to admin user
      required: true,
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

// compound index [so that a user can only add one review]
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);
