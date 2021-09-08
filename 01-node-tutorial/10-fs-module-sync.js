// work with file system
const { readFileSync, writeFileSync } = require('fs');

// read data from a file
const first = readFileSync('./content/first.txt', 'utf-8');
const second = readFileSync('./content/second.txt', 'utf-8');

console.log(first, second);

// create a new file with specified data
writeFileSync(
  './content/result-sync.txt',
  `Here is the specified text - ${first} and ${second}`,
  { flag: 'a' }
);
