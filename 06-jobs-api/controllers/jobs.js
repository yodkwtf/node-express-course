const Job = require('../models/Job');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

// # GET ALL JOBS
const getAllJobs = async (req, res) => {
  // get the user specific jobs and sort by date
  const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt');

  // send the response
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

// # GET SINGLE JOB
const getJob = async (req, res) => {
  res.send('get single job');
};

// # CREATE JOB
const createJob = async (req, res) => {
  // create a new property on req.body to specify the user
  req.body.createdBy = req.user.userId;

  // create job
  const job = await Job.create(req.body);

  // send response
  res.status(StatusCodes.CREATED).json({ job });
};

// # UPDATE JOB
const updateJob = async (req, res) => {
  res.send('update job');
};

// # DELETE JOB
const deleteJob = async (req, res) => {
  res.send('delete job');
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
