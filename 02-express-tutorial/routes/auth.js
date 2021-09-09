const express = require('express');
// setup router from express
const router = express.Router();

router.post('/', (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Hello ${name}`);
  } else {
    return res.status(401).send('please provide your name');
  }
});

module.exports = router;
