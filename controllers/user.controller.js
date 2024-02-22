const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const exists = await User.findOne({ email: req.body.email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "user already exists" });
    }
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.status(201).json({ success: true, message: "registered successfully" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "incorrect username or password" });
    }
    const matchPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!matchPassword) {
      return res
        .status(404)
        .json({ success: false, message: "incorrect username or password" });
    }

    jwt.sign(
      _.pick(user, ["_id", "email"]),
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).json({ success: false, message: err.message });
        }
        // send normal responce
        res.json({
          success: true,
          user: _.pick(user.toJSON(), [
            "_id",
            "name",
            "email",
            "number",
            "mental_health_problem",
            "age_group",
          ]),
          token,
        });
      }
    );
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const updateTherapist = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        therapist: req.body,
      },
      { new: true }
    );
    res.status(201).json({ success: true, message: "therapist updated" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const temp = async (req, res) => {
  try {
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

module.exports = { register, login, updateTherapist };
