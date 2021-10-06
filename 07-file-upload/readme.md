## File Upload

A mini app created to learn how to handle file uploads. While there are many ways to do it, we use **express-file-upload** library to handle the uploads and **cloudinary** service option to upload images to the cloud.

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
