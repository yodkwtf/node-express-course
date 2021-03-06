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
  // get the user id from user object and job id from query params [both in req object]
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // find the single job with its id = jobID and created by the user
  const job = await Job.findOne({ createdBy: userId, _id: jobId });

  // if jobID isnt correct
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }

  // send response
  res.status(StatusCodes.OK).json({ job });
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
  // get the userID, jobID and the job properties
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  // check to make sure properties arent empty
  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  // find the specific job and update it
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  // if job isnt found
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }

  // send updated job as response
  res.status(StatusCodes.OK).json({ job });
};

// # DELETE JOB
const deleteJob = async (req, res) => {
  // get the userId and jobId from request object
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  // find the specific job and delete it
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

  // if job isnt found
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }

  // send 200 as a status code
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
