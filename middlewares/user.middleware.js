const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isLogedin = async (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth || !auth.startsWith("Bearer")) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized, token not found" });
    return;
  }
  // get the token
  const token = auth.split(" ")[1];
  if (!token) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized, token not found" });
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // find the user
    const user = await User.findById(decoded._id);
    if (!user) {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "authentication failed, maybe token is expired",
    });
  }
};

const registerValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("number").notEmpty().withMessage("number is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("mental_health_problem")
    .notEmpty()
    .withMessage("mental_health_problem is required"),
  body("age_group").notEmpty().withMessage("age_group is required"),
];

const loginValidator = [
  body("email").isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("password is required"),
];

module.exports = {
  registerValidator,
  loginValidator,
  isLogedin,
};
