const JobModel = require("../model/JobModel");
const mongoose = require("mongoose");

const postJob = async (req, res) => {
  try {
    const job = await JobModel.create({
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
      location: req.body.location,
      postedBy: req.userId,
    });
    res.status(200).json({
      status: true,
      message: "Job Created Successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const allJobs = await JobModel.find().populate(
      "postedBy",
      "username email",
    );
    res.status(200).json({
      status: true,
      message: "All Jobs Data",
      data: allJobs,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Single Job Data",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndUpdate(req.params.id,req.body);
    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job Not Found",
      });
    }
    res.status(200).json({
      status: true,
      message: "Single Job Data",
      data: job,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { postJob, getAllJobs, getSingleJob };
