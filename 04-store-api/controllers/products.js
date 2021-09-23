const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(5);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // get only properties u want
  const { featured, company, name, sort, fields } = req.query;

  // setting up query object for the queries
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // means case insenstivity (search feature)
  }

  // console.log(queryObject);
  //- get products queries
  let result = Product.find(queryObject);

  // sort products
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // select specific fields
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // get page number & limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  // calc how many items to skip to reach to specific page
  const skip = (page - 1) * limit;
  // skip specified no. of items
  result = result.skip(skip).limit(limit);

  //- get sorted products
  const products = await result;

  //- send products
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
