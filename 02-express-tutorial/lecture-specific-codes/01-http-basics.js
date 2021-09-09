const http = require('http');

const server = http.createServer((req, res) => {
  console.log('user hit the server');

  // must have to res.end() to tell the server we're done sending the response
  res.end(`<h1>HomePage</h1>`);
});

// for server to run we need to specify the port
// we have specific ports for specific things
server.listen(5000);
