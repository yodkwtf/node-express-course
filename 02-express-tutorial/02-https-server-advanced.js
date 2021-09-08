const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  // -HOME PAGE
  if (url === '/') {
    // pass the headers
    res.writeHead(200, { 'content-type': 'text/html' });
    // pass the data for homepage
    res.write(`<h1>Home Page</h1>`);
  }

  // -ABOUT PAGE
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>About Page</h1>`);
  }

  // -ERROR PAGE
  else {
    res.writeHead(404, { 'content-type': 'text/html' });
    res.write(`<h1>Page Not Found :/</h1>`);
  }

  // must have to res.end() to tell the server we're done sending the response
  res.end();
});

// for server to run we need to specify the port
// we have specific ports for specific things
server.listen(5000);
