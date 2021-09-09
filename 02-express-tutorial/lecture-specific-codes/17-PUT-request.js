const express = require('express');
const app = express();
let { people } = require('./data');

// *MIDDLEWARES

// static assets
app.use(express.static('./methods-public'));
// parse form data (it will parse and add data to req.body)
app.use(express.urlencoded({ extended: false }));
// parse JSON
app.use(express.json());

/**
 * # PUT Method
 * used to edit/updae some data
 * we use route param to target specific item [convention]
 */

app.put('/api/people/:id', (req, res) => {
  // get item id
  const { id } = req.params;
  // get item current value
  const { name } = req.body;

  // find right person
  const person = people.find((person) => person.id === Number(id));

  // handle error
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: 'person does not exist ' });
  }

  // update data
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });

  res.status(200).json({ success: true, data: newPeople });
});

// -post
app.post('/api/people', (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide the name 😠' });
  }

  res.status(201).json({ success: true, person: name });
});

// -get
app.get('/api/people', (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//* PORT
app.listen(5000, () => {
  console.log(`Server is listening at port 5000...`);
});
