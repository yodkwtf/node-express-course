## File Upload

A mini app created to learn how to handle file uploads. While there are many ways to do it, we use [express-fileupload](https://github.com/richardgirges/express-fileupload#readme) library to handle the uploads and **cloudinary** service option to upload images to the cloud.

> The idea is that you're the admin of an E-commerce store and you can add-in the new products using the form. However, before you create and add a new product you need to add the product image to the server since the new product will need the path for its image.

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

## Notes

- We need to make sure to upload the product image to the server before creating that product since creating the product will demand the image path from us.
- Make sure to the directory where the images are uploaded is publicly available.

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

   - Take product data from `req.body`
   - Use mongoose **create** method to create a new product
   - Send the newly created product as the response

2. Get All Products in `productController.js`

   - Used to get the list of all products
   - Uses GET method

3. Upload Product Image in `uploadsController.js`

   - Get productImage from `req.files.image` via [express-fileupload](https://github.com/richardgirges/express-fileupload#readme) package
   - Create the path for the images where to save them
   - Make sure the directory is public
   - Use **mv** function of the package to move the image to the specified directory
   - Send image path as a response
