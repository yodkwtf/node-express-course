const mongoose = require('mongoose');

// Single Cart Item Model
const SingleOrderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  amount: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
});

// Orders Schema
const OrderSchema = new mongoose.Schema(
  {
    tax: {
      type: Number,
      required: true,
    },

    shippingFee: {
      type: Number,
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
      default: 'pending',
    },

    orderItems: [SingleOrderItemSchema], // another schema for every single cart item

    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    clientSecret: {
      type: String,
      required: true,
    },

    paymentIntentId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
