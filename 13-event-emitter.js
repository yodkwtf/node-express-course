const EventEmitter = require('events');

const customEmitter = new EventEmitter();

// we have access to arguments
customEmitter.on('response', (name, age) => {
  console.log(
    'Data Recieved! The dude is ' + name + ' and he is ' + age + ' years old.'
  );
});

// pass the arguments
customEmitter.emit('response', 'Deekayy', 19);
