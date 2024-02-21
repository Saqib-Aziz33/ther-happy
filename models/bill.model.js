const mongoose = require("mongoose");
const { PAYMENT_METHODS } = require("../utils/constants");

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    // plan: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Plan",
    // },
    amount: {
      type: Number,
      required: true,
    },
    expire: {
      type: Date,
      required: true,
    },
    payment_method: {
      type: String,
      required: true,
      enum: [PAYMENT_METHODS.stripe],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    card: {
      brand: String,
      last4: String,
      exp_month: Number,
      exp_year: Number,
    },
    token: String,
    receipt: String,
  },
  { timestamps: true }
);

const Bill = mongoose.model("Bill", schema);

module.exports = Bill;
