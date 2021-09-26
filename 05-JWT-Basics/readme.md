### Goals

- Handle authentication using JWT so any random user can't access all the data from our site.
- Just covering the basics.

### Notes

- Since we are only working with JWT basics, we are not connecting to database in this project. Eventually, we will just use the local storage to store the JWT token.
- Even autheticated users don't get access to all the data, they only get access to the specified routes by the servers (us, in this case).

### Packages

- `express-async-errors` - removes the need of creating an async wrapper middleware to wrap the trycatch block of all the controllers and does all the heavy lifting itself

#### Controllers and Routes

- `Login` - To allow user to login and get their data
- `Dashboard` - To show the secret code to the authenticated user
