const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Not authorized, no Bearer token",
      });
    }

    const token = authHeader.replace("Bearer", "").trim();

    console.log("TOKEN:", token);
    console.log("TOKEN PARTS:", token.split(".").length);
    console.log("JWT SECRET EXISTS:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};

module.exports = { protect };