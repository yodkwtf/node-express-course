const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

// *MIDDLEWARES

// static assets
app.use(express.static('./methods-public'));
// parse form data (it will parse and add data to req.body)
app.use(express.urlencoded({ extended: false }));
// parse JSON
app.use(express.json());

/**
 * # express routers
 * setup different files for similar routes
 * provide and base api here
 * use the router from route file as a middleware
 */

// express router (setup with base route)
app.use('/api/people', people);
app.use('/login', auth);

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
