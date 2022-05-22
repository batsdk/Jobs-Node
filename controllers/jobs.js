const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = (req, res) => {
  res.send("get ALL JOBsss");
};
const getJob = (req, res) => {
  res.send("get JOB");
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = (req, res) => {
  res.send("update JOB");
};
const deleteJob = (req, res) => {
  res.send("delete JOB");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
