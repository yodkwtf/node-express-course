const path = require('path');
const { StatusCodes } = require('http-status-codes');

// # UPLOAD PRODUCT IMAGE (POST)
const uploadProductImage = async (req, res) => {
  // save the image
  const productImage = req.files.image;

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
