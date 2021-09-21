const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
require('dotenv').config();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// specify base route
app.use('/api/v1/tasks', tasks);

// handle 404 for custom response
app.use(notFound);

const port = 3000;

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
