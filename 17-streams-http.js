const http = require('http');
const fs = require('fs');

http
  .createServer((req, res) => {
    // const text = fs.readFileSync('./content/big-file.txt', 'utf8');
    // res.end(text);

    // - using read stream to read data
    const fileStream = fs.createReadStream('./content/big-file.txt', 'utf-8');

    fileStream.on('open', () => {
      fileStream.pipe(res);
    });
    fileStream.on('error', (err) => {
      res.end(err);
    });
  })
  .listen(5000);
