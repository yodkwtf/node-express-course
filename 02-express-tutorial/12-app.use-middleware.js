const express = require('express');
const app = express();
const logger = require('./logger');

/**
 *# app.use
 * calls logger middleware for all of the routes
 * order matters (if its below about route, it wont work for the about and ones above about)
 * we can also provide path to be specific about which routes
 * accessible to any routes after `/api` (called base)
 * `/api/products` | `/api/items` | `/api/items/hero/3/about`
 */

// app.use(logger);
app.use('/api', logger);

app.get('/', (req, res) => {
  res.send(`<h1>Home</h1>`);
});

app.get('/about', (req, res) => {
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
