const { StatusCodes } = require("http-status-codes");
const Job = require("../models/Job");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const job = await Job.find({ createdBy: req.user.userID }).sort("createdAt");

  res.status(StatusCodes.OK).json({ count: job.length, job });
};
const getJob = async (req, res) => {
  const job = await Job.find({
    _id: req.params.id,
    createdBy: req.user.userID,
  });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  if (req.body.company === "" || req.body.position === "") {
    throw new BadRequestError("Company or position fields cannot be empty");
  }

  const job = await Job.updateOne(
    { _id: req.params.id, createdBy: req.user.userID },
    { ...req.body }
  );

  console.log(req.body);
  res.json({ msg: "Updatd Succesfully" });
};

const deleteJob = async (req, res) => {
  const job = await Job.findOneAndRemove({
    _id: req.params.id,
    createdBy: req.user.userID,
  });

  if (!job) {
    throw new NotFoundError("Job not found");
  }

  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
