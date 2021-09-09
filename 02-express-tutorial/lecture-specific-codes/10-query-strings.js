const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1>HomePage</h1><a href="/api/products">products</a>');
});

// * QUERY STRINGS

app.get('/api/v1/query', (req, res) => {
  // get queries from url
  const { search, limit } = req.query;

  // by default, all products
  let sortedProducts = [...products];

  // get product started with specified elements
  if (search) {
    sortedProducts = sortedProducts.filter((product) =>
      product.name.startsWith(search)
    );
  }

  // limit the no. of products
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }

  // if no. filtered products found
  if (sortedProducts.length === 0) {
    // res.status(200).send('No products matched your search');
    return res.status(200).json({ success: true, data: [] });
  }

  // send items
  return res.status(200).json(sortedProducts);
});

// PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
