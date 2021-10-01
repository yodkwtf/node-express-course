// setup express router
const express = require('express');
const router = express.Router();

// get controller functions
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../controllers/jobs');

// * ROUTES

//# GET ALL JOBS || CREATE JOB
router.route('/').get(getAllJobs).post(createJob);

//# GET SPECIFIC JOB || UPDATE JOB || DELETE JOB
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
