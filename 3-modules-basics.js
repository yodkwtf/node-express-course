// Modules

// import data via common js syntax
const people = require('./4-names-module-setup');
const sayHi = require('./5-utils-module-setup');

// console.log(names);

sayHi(people.john);
sayHi('susan');
sayHi(people.peter);
