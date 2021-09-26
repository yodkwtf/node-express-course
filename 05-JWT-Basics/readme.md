## JWT Basics

A mini app created to learn about the basics of setting up authentication with JWT using node and express server. We also have a frontend to test the routes.

## Preview

The app isn't yet deployed anywhere. The only way to preview it is by running it locally.

#### How to run?

- Clone this repo first if you haven't
  ```bash
  git clone https://github.com/yodkwtf/nodejs-course.git
  ```
- Use the terminal and navigate to `05-JWT-Basics` directory
- Install the dependencies and run the server
  ```bash
  npm install && npm start
  ```
- You can test the app and routes by navigating manually on port 3000 or using a third party tool like postman. Just remember to add authentication headers when working with JWTs.

### Goals

- Setting up authentication using JWT
- Allowing users to only access their specific data.
- Seeing how it works in the frontend using localstorage to store the token
- Just covering the basics.

### Routes and Controllers

#### _Login_ - To allow user to login/register and send their data to server

- In _routes_, use `post('/login')` and send user data to server
- In _controllers_, get the username and password from the new user
- create the JWT token
- send the token to server

#### _Dashboard_ - To send the specific response for the authenticated user

- In _routes_, use `get('/dashboard')` to send user specific data as a response
- In _controllers_, get the authheader from req.body
- validate the syntax for the header
- extract the _token_ from the bearer token
- verify token & get token specific data
- send the secret key and specific data as the response

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself
- `jsonwebtoken` - used to sign and decode json web tokens
- `http-status-codes` - to send http error codes based on request names instead of hardcoding them

### Notes

- Since we are only working with JWT basics, we are not connecting to database in this project. Eventually, we will just use the local storage to store the JWT token.
- Even autheticated users don't get access to all the data, they only get access to the specified routes by the servers (us, in this case).
- `How JWT works?`
  - User requests a login
  - Server sends the signed JWT response
  - User provides the signed JWT resposne to server and requests the data
  - If signed JWT is correct, server sends the response as data
- `Why auth middleware?`
  - In bigger projects we will have a lot more routes than just a dashboard that may require user authentication. So setting up the auth funtionality for every single route isn't ideal. So we setup a middleware and pass it to the routes in which we wanna use the authentication process.
