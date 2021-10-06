const { StatusCodes } = require('http-status-codes');

// # UPLOAD PRODUCT IMAGE (POST)
const uploadProductImage = async (req, res) => {
  console.log(req);

  res.send('upload product image');
};

module.exports = uploadProductImage;
