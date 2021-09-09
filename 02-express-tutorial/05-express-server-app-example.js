const express = require('express');
const path = require('path');
const app = express();

// get all resources at once
// (we need to put all our static resources in public directory now) - static assets are the ones servers doesnt have to change like images, styles, js and all
// (we could also do it directly with navbar app but we follow the convention here)
// app.use is for setting up middleware (express.static is a built-in middleware)
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
});

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});

// PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
