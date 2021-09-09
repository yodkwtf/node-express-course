// get express
const express = require('express');

// invoke it
const app = express();

// what to do when user performs a get req to our page

// -HOME PAGE
app.get('/', (req, res) => {
  // send data back to user
  res.status(200).send('Welcome to Home Page!!!');
});

// -ABOUT PAGE
app.get('/about', (req, res) => {
  res.status(200).send('About Page');
});

// -ERROR PAGE (app.all listens for any and all type of requests)
app.all('*', (req, res) => {
  res.status(404).send(`<h1>This page does not exist.</h1>`); // by default it will take 200 since we are sending custom response
});

// listen to specific port
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});

//# MAIN METHODS
// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen
