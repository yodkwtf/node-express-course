// get info about paths & directory
const path = require('path');

// get system specific separator
console.log(path.sep);

// join to create paths
const filePath = path.join('/content', 'subfolder', 'test.txt');

console.log(filePath);

// get the basename
const base = path.basename(filePath);

console.log(base);

// convert sq of paths to absolute paths
const absolutePath = path.resolve(
  __dirname,
  'content',
  'subfolder',
  'test.txt'
);

console.log(absolutePath);
