// # GET ALL JOBS
const getAllJobs = async (req, res) => {
  res.send('get all jobs');
};

// # GET SINGLE JOB
const getJob = async (req, res) => {
  res.send('get single job');
};

// # CREATE JOB
const createJob = async (req, res) => {
  res.send('create job');
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
