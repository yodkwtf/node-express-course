const express = require('express');
const app = express();
let { people } = require('./data');

// static assets
app.use(express.static('./methods-public'));
// parse form data (it will parse and add data to req.body)
app.use(express.urlencoded({ extended: false }));

/**
 * # POST Method
 * used to send some data to the server
 */

app.post('/login', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Hello ${name}`);
  } else {
    return res.status(401).send('please provide your name');
  }
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
