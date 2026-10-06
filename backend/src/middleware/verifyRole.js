const UserModel = require("../model/UserModel");

const isEmployer = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });

    if (user.role !== "employer") {
      return res.status(403).json({
        message: "Only employer can post jobs",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports= isEmployer