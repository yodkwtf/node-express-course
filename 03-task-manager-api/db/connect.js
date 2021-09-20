const mongoose = require('mongoose');

const connectionString =
  'mongodb+srv://Durgesh:HeyBatman@nodeexpressprojects.sobnn.mongodb.net/03-TASK-MANAGER?retryWrites=true&w=majority';

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('CONNECTED TO THE DB'))
  .catch((e) => console.log(e));
