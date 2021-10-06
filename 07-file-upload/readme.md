## File Upload

A mini app created to learn how to handle file uploads. While there are many ways to do it, we use **express-fileupload** library to handle the uploads and **cloudinary** service option to upload images to the cloud.

> The idea is that you're the admin of an E-commerce store and you can add-in the new products using the form. However, before you add the product to the DB you need to add the product image to the server since the product needs the path for that image.

#### Goals

- Learning how to upload files to the servers
- Uploading images using postman

## Preview

The app was too small so I chose not deploy it anywhere. The only way to preview it is by running it locally.

#### How to run?

- Clone this repo first if you haven't
  ```bash
  git clone https://github.com/yodkwtf/nodejs-course.git
  ```
- Use the terminal and navigate to `07-file-upload` directory
- Install the dependencies and run the server
  ```bash
  npm install && npm start
  ```

## Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself
- `jsonwebtoken` - used to sign and decode json web tokens
- `http-status-codes` - to send http error codes based on request names instead of hardcoding them

## Notes

#### Models

1. Product
   - Structure for the all single products
   - Product Name [String & Required]
   - Product Price [Number & Required]
   - Product Image [String & Required]

#### Routes

1. `post('/', createProduct)` - Create a new product
2. `get('/', getAllProducts)` - Get all the products
3. `post('/uploads', uploadProductImage)` - Upload the product image

#### Controllers

1. Create Product in `productController.js`

   - Used to create a new product
   - Uses POST method

2. Get All Products in `productController.js`

   - Used to get the list of all products
   - Uses GET method

3. Upload Product Image in `uploadsController.js`

   - Used to upload the product image
   - Uses POST method
