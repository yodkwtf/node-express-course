require('dotenv').config();
// package for async wrapper
require('express-async-errors');

const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

// middlewares
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});
// base path
app.use('/api/v1/products', productsRouter);

// products route

// error middlewares
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// port
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connect to DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
