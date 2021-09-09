const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

/**
 *# using mulitple middlewares at once
 * simply put them in an array
 * will be executed in same order
 */

app.use([logger, authorize]);

app.get('/', (req, res) => {
  res.send(`<h1>Home</h1>`);
});

app.get('/about', (req, res) => {
  console.log(req.user);
  res.send(`<h1>About</h1>`);
});

app.get('/api/products', (req, res) => {
  res.send(`<h1>Products</h1>`);
});

app.get('/api/items', (req, res) => {
  res.send(`<h1>Items</h1>`);
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
