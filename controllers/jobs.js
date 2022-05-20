const getAllJobs = (req, res) => {
  res.send("get All JOBS");
};
const getJob = (req, res) => {
  res.send("get JOB");
};
const createJob = (req, res) => {
  res.send("create JOB");
};
const updateJob = (req, res) => {
  res.send("update JOB");
};
const deleteJob = (req, res) => {
  res.send("delete JOB");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
