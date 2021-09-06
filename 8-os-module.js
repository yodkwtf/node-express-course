const os = require('os');

// get info about the user
const user = os.userInfo();

console.log(user);

// get system uptime in seconds
console.log(os.uptime());

// few other methods
const osMethods = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};

console.log(osMethods);
