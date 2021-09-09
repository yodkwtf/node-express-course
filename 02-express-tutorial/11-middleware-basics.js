const express = require('express');
const app = express();

/**
 * # Middleware
 * req => middleware => res
 * has access to both req and res
 * express will supply the req & res to our middleware func automatically
 * it will also supply next
 */

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();

  console.log(method, url, time);

  // we much past it on to the next middleware unless we send the response directly in middleware ourself
  next();
};

app.get('/', logger, (req, res) => {
  res.send(`<h1>Home</h1>`);
});

app.get('/about', logger, (req, res) => {
  res.send(`<h1>About</h1>`);
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
