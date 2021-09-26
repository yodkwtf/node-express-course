### Goals

- Handle authentication using JWT so any random user can't access all the data from our site.
- Just covering the basics.

### Notes

- Since we are only working with JWT basics, we are not connecting to database in this project. Eventually, we will just use the local storage to store the JWT token.
- Even autheticated users don't get access to all the data, they only get access to the specified routes by the servers (us, in this case).
- `How JWT works?`
  - User requests a login
  - Server send the signed JWT response
  - User provides the signed JWT resposne to server and requests the data
  - If signed JWT is correct, server sends the response as data
- `Why auth middleware?`
  - In bigger projects we will have a lot more routes than just a dashboard that may require user authentication. So setting up the auth funtionality for every single route isn't ideal. So we setup a middleware and pass it to the routes in which we wanna use the authentication process.

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself
- `jsonwebtoken` - used to sign and decode and json web tokens
- `http-status-codes` -

#### Controllers and Routes

- `Login` - To allow user to login and send their data to server
  - using POST method
  - get the username and password from the new user
  - create the JWt token
  - send the token to server using the post method
- `Dashboard` - To send the specific response for the authenticated user
  - using GET method
  - get the authheader from req.body
  - validate the syntax for the header
  - extract the _token_ from the bearer token
  - verify token & get token specific data
  - send the secret key and specific data as the response
