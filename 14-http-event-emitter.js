const http = require('http');

// create a server
const server = http.createServer();

server.on('request', (req, res) => {
  res.end('Hellllllooooooooo People');
});

// specify the port to run the server
server.listen(5000);
