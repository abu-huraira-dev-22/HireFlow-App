const UserModel = require("../model/UserModel");

const isJobSeeker = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });

    if (user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only job seeker can apply",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports= isJobSeeker