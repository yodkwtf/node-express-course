const express = require('express');
const path = require('path');
const app = express();

// app.use is for setting up middleware (express.static is a built-in middleware)
app.use(express.static('./public'));

// ! we put all our static files in the public folder including index.html (which will send as a response by default) and now we dont have to setup paths for any static asset

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

// PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
