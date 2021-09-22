const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ name: 'vase table' });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // get only properties u want
  const { featured, company } = req.query;

  // setting up query object for the queries
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }

  console.log(queryObject);
  // get products
  const products = await Product.find(queryObject);

  // send products
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
