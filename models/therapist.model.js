const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    train: {
      type: String,
      required: false,
    },
    tone: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Therapist = mongoose.model("Therapist", schema);

module.exports = Therapist;
