// * CREATE PRODUCT
const createProduct = async (req, res) => {
  res.send('create product');
};

// * GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  res.send('get all products');
};

// * GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  res.send('get single product');
};

// * UPDATE PRODUCT
const updateProduct = async (req, res) => {
  res.send('update product');
};

// * DELETE PRODUCT
const deleteProduct = async (req, res) => {
  res.send('delete product');
};

// * UPLOAD PRODUCT Image
const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
