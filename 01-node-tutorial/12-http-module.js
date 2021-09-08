const http = require('http');

// create a server
const server = http.createServer((req, res) => {
  // use req object
  if (req.url === '/') {
    res.end('Welcome to the homepage!');
  }

  if (req.url === '/about') {
    res.end('This is the about page');
  }

  res.end(`
  <h1 style="color:red">OOPS!</h1>
  <p>This page doesn't exist</p>
  `);
});

// specify the port to run the server
server.listen(5000);
