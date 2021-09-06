const http = require('http');

// create a server
const server = http.createServer((req, res) => {
  res.write('welcome to our homepage');
  res.end();
});

// specify the port to run the server
server.listen(5000);
