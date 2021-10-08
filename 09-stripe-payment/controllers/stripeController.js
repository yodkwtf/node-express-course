const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const stripeController = async (req, res) => {
  // get data from the frontend
  const { purchase, total_amount, shipping_fee } = req.body;

  // confirm the cost [usually done by iterating over items & comparing the prices to DB]
  const calculateOrderAmount = () => {
    return total_amount + shipping_fee;
  };

  // communicate with stripe
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: 'inr',
  });

  // send the response and verify the client
  res.json({ clientSecret: paymentIntent.client_secret });
};

module.exports = stripeController;
