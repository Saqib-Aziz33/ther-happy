const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "rating is required"],
    },
    feedback: {
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

const Review = mongoose.model("Review", schema);

module.exports = Review;
