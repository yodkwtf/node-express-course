const express = require('express');
// setup router from express
const router = express.Router();

// import controller functions
const {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
} = require('../controllers/people');

// # GET
router.get('/', getPeople);

// # POST
router.post('/', createPerson);

// # PUT
router.put('/:id', updatePerson);

// # DELETE
router.delete('/:id', deletePerson);

//! another method to setup routes [chaining] 👇
// router.route('/').get(getPeople).post(createPerson);
// router.route('/:id').put(updatePerson).delete(deletePerson);

module.exports = router;
