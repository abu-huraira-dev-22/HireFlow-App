const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "undefined") {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = bearerHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.userId = decoded.id;
    next();

  } catch (error) {
    console.log(error.message)
    res.status(403).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = verifyToken;