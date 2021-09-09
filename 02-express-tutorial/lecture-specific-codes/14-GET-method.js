const express = require('express');
const app = express();
let { people } = require('./data');

/**
 * # GET Method
 * default request method browser performs
 */

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
