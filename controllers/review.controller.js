const { validationResult } = require("express-validator");
const Review = require("../models/review.model");

const addNew = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  try {
    const review = new Review(req.body);
    review.user = req.user._id;
    await review.save();
    res.status(201).json({ success: true, message: "review added", review });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

const getAll = async (req, res) => {
  try {
    const review = await Review.findOne({ user: req.user._id });
    res.json({ success: true, review });
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

module.exports = { addNew, getAll };
