const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// specify base route
app.use('/api/v1/tasks', tasks);

// handle 404 for custom response
app.use(notFound);
app.use(errorHandlerMiddleware);

// setting up port for deployments
const port = process.env.PORT || 3000;

// start the connection
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // only spin up the server if connection is running
    app.listen(port, () => console.log(`Server is running at port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
