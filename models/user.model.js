const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  number: {
    type: String,
    required: [true, "number is required"],
  },
  mental_health_problem: {
    type: String,
    required: [true, "mental_health_problem is required"],
  },
  age_group: {
    type: String,
    required: [true, "age_group is required"],
  },
  therapist: {
    train: {
      type: String,
      required: false,
    },
    tone: {
      type: String,
      required: false,
    },
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
