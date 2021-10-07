const path = require('path');
const fs = require('fs');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;

// # UPLOAD PRODUCT IMAGE [Local Setup] (POST)
const uploadProductImageLocal = async (req, res) => {
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
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

// # UPLOAD PRODUCT IMAGE [Cloudinary Setup] (POST)
const uploadProductImage = async (req, res) => {
  // upload the image from temp directory to cloudinary
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true, // save it as the filename
      folder: 'nodejs-file-upload', // specify the folder where to save
    }
  );

  // remove the image from temp directory
  fs.unlinkSync(req.files.image.tempFilePath);

  // send image url as response
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = uploadProductImage;
