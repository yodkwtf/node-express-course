require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    // connect to db
    await connectDB(process.env.MONGO_URI);

    // remove current products to start from scratch
    await Product.deleteMany();

    // push products dynamically
    await Product.create(jsonProducts);

    // terminate after success, we dont want file to be running
    process.exit(0); // 0-means success
  } catch (error) {
    console.log(error);
    process.exit(1); // 1-means error
  }
};

start();
