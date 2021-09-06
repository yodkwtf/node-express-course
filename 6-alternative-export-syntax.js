module.exports.items = ['item 1', 'item 2'];

const person = {
  name: 'Bobby',
};

module.exports.singlePerson = person;

// we are able to do it because module.exports is an object at the end of the day so we are just creating properties for that objects
