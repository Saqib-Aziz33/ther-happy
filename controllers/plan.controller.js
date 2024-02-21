const Stripe = require("stripe");
const Plan = require("../models/plan.model");
const Bill = require("../models/bill.model");
const { PAYMENT_METHODS } = require("../utils/constants");
const { validationResult } = require("express-validator");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const subscribe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  const plan = { price: req.body.price };
  try {
    // validate plan, exists or not
    // const plan = await Plan.findById(req.body.plan);
    // if (!plan) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "plan not found" });
    // }

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount: plan.price * 100,
      currency: "USD",
      source: req.body.token,
    });
    // create a bill
    const bill = new Bill({
      amount: package.price,
      payment_method: PAYMENT_METHODS.stripe,
      paid: true,
      card: {
        brand: charge.source.brand,
        last4: charge.source.last4,
        exp_month: charge.source.exp_month,
        exp_year: charge.source.exp_year,
      },
      token: req.body.token,
      receipt: charge.receipt_url,
      user: req.user._id,
      // plan: plan._id,
      expire: new Date(),
    });
    await bill.save();

    res
      .status(201)
      .json({ success: true, message: "payment successfull", bill });
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

module.exports = { subscribe };
