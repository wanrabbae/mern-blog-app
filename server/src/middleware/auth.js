const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAdmin = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. silahkan login atau register terlebih dahulu",
      });
    }

    const findUser = await User.findById(decoded.id);

    if (findUser.level !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    req.decoded = decoded;
    next();
  });
};

exports.auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. silahkan login atau register terlebih dahulu",
      });
    }
    req.decoded = decoded;
    next();
  });
};
