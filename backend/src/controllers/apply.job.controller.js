const ApplicationModel = require("../model/ApplicationModel");
const JobModel = require("../model/JobModel");

const applyToJob = async (req, res) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job Not Found",
      });
    }

    const application = await ApplicationModel.create({
      applicant: req.userId,
      job: req.params.id,
    });

    res.status(201).json({
      status: true,
      message: "Applied Successfully",
      data: application,
    });
  } catch (error) {
    // unique index (job + applicant) toot gaya = dobara apply kiya
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "You have already applied to this job",
      });
    }
    res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { applyToJob };