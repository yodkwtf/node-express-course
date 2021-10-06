const path = require('path');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// # UPLOAD PRODUCT IMAGE (POST)
const uploadProductImage = async (req, res) => {
  // check if image uploaded
  if (!req.files) {
    throw new CustomError.BadRequestError('No File Uploaded');
  }
  // save the image
  const productImage = req.files.image;

  // check img format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload an image!');
  }

  // check img size
  if (productImage.size > 1024 * 1024) {
    throw new CustomError.BadRequestError(
      'Please upload an image smaller than 1MB'
    );
  }

  // create the image path where u want to store images
  const imagePath = path.join(
    __dirname,
    `../public/uploads/${productImage.name}`
  );

  // move image to specified path
  await productImage.mv(imagePath);

  // ! make sure to make the uploads folder publicly available in app.js using express.static()

  // send image path as response
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports = uploadProductImage;
