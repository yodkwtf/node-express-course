// get data
let { people } = require('../data');

//# for GET request
const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

//# for POST request
const createPerson = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: 'please provide the name 😠' });
  }

  res.status(201).json({ success: true, person: name });
};

//# for PUT request
const updatePerson = (req, res) => {
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
};

//# for DELETE request
const deletePerson = (req, res) => {
  // get item id
  const id = req.params.id;

  // find right person
  const person = people.find((person) => person.id === Number(id));

  // if cant find item
  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: 'person does not exist' });
  }

  // delete the specific data
  const newPeople = people.filter((person) => person.id !== Number(id));

  res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
};
