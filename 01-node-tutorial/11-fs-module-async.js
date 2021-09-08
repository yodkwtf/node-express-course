// work with file system
const { readFile, writeFile } = require('fs');

// read file
readFile('./content/first.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }

  const firstText = result;

  readFile('./content/second.txt', 'utf8', (e, res) => {
    if (e) {
      console.log(e);
      return;
    }

    const secondText = res;

    // create new file with data
    writeFile(
      './content/result-async.txt',
      `Here is the specified text - ${firstText} and ${secondText}`,
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
      }
    );
  });
});
