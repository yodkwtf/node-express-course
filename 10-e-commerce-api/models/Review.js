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

// static method
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  // aggregation setup
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: '$product',
        averageRating: {
          $avg: '$rating',
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  // get the product and update its rating and count
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// # PRE HOOKS
ReviewSchema.post('save', async function () {
  // call the static method
  await this.constructor.calculateAverageRating(this.product);
});

ReviewSchema.post('remove', async function () {
  // call the static method
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model('Review', ReviewSchema);
