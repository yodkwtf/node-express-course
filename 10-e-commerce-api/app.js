// * IMPORTS
require('dotenv').config();
require('express-async-errors');
// express
const express = require('express');
const app = express();
// packages
const morgan = require('morgan');
// database
const connectDB = require('./db/connect');
// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// * MIDDLEWARES
app.use(morgan('tiny'));
app.use(express.json());

// * ROUTES
app.get('/', (req, res) => {
  res.send('E-Commerce API');
});

// * ERRORS
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 5000;
// start
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
