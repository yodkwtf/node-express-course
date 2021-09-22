const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ name: 'vase table' });
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // get products
  const products = await Product.find(req.query);

  // send products
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
