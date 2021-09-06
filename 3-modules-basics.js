// Modules

// import data via common js syntax
const people = require('./4-names-module-setup');
const sayHi = require('./5-utils-module-setup');
const { singlePerson, items } = require('./6-alternative-export-syntax');

// console.log(names);

sayHi(people.john);
sayHi('susan');
sayHi(people.peter);

console.log(singlePerson, items);
