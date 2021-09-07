const { createReadStream } = require('fs');

// specify path to read data from
const stream = createReadStream('./content/big-file.txt');

// read data in chunks
stream.on('data', (result) => {
  console.log(result);
});

// ! we get 64kb per chunks by default but we can change it
