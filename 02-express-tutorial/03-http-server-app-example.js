const http = require('http');
const { readFileSync } = require('fs');

// ! this example wont be suiatable if we have 10s and 100s of resources to serve the user and thats why we use something like express js

// get contents from all files
const homePage = readFileSync('./navbar-app/index.html');
const homeStyles = readFileSync('./navbar-app/styles.css');
const homeImage = readFileSync('./navbar-app/logo.svg');
const homeLogic = readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
  const url = req.url;

  // -HOME PAGE
  if (url === '/') {
    // pass the headers
    res.writeHead(200, { 'content-type': 'text/html' });
    // pass the data for homepage
    res.write(homePage);
  }

  // -ABOUT PAGE
  else if (url === '/about') {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.write(`<h1>About Page</h1>`);
  }

  // -CSS
  else if (url === '/styles.css') {
    res.writeHead(200, { 'content-type': 'text/css' });
    res.write(homeStyles);
  }

  // -LOGO
  else if (url === '/logo.svg') {
    res.writeHead(200, { 'content-type': 'image/svg+xml' });
    res.write(homeImage);
  }

  // -LOGIC
  else if (url === '/browser-app.js') {
    res.writeHead(200, { 'content-type': 'text/javascript' });
    res.write(homeLogic);
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
