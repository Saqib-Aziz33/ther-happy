const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["month", "year", "lifetime"],
  },
});

const Plan = mongoose.model("Plan", schema);

module.exports = Plan;
