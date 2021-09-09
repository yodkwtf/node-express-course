const express = require('express');
const app = express();
let { people } = require('./data');

// *MIDDLEWARES

// static assets
app.use(express.static('./methods-public'));
// parse form data (it will parse and add data to req.body)
app.use(express.urlencoded({ extended: false }));
// parse JSON
app.use(express.json());

/**
 * # POST Method
 * used to send some data to the server
 * same url but diffrent method are different things
 */

app.post('/api/people', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide the name 😠' });
  }

  res.status(201).json({ success: true, person: name });
});

app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
