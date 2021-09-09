const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  // send data as JSON
  res.json(products);
});

// PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
