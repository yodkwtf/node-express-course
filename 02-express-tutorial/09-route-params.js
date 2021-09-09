const express = require('express');
const app = express();
const { products } = require('./data');

app.get('/', (req, res) => {
  res.send('<h1>HomePage</h1><a href="/api/products">products</a>');
});

// get only the specific properties
app.get('/api/products', (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

// get a specfic product
app.get('/api/products/:productID', (req, res) => {
  // get specific product id (whatever is in the url as unique identifier gets equalled to the placeholder above)
  const { productID } = req.params;

  // find product
  const singleProduct = products.find(
    (product) => product.id === Number(productID)
  );

  // check if project exists
  if (!singleProduct) {
    res.status(404).send('Product Not Found :/');
  }

  // send it
  res.json(singleProduct);
});

// PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
