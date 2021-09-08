const { writeFileSync } = require('fs');

for (let i = 1; i < 10000; i++) {
  writeFileSync('./content/big-file.txt', `Hello Friend Number ${i}\n`, {
    flag: 'a',
  });
}
