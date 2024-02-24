const Stripe = require("stripe");
const Plan = require("../models/plan.model");
const paypal = require("paypal-rest-sdk");
const Bill = require("../models/bill.model");
const { PAYMENT_METHODS } = require("../utils/constants");
const { validationResult } = require("express-validator");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

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

const subscribeWithPaypal = async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res
      .status(400)
      .json({ success: false, message: "amount is required" });
  }
  const paymentData = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${process.env.SITE_URL}/api/plans/subscribe/paypal/success?user_token=${req.user._id}`,
      cancel_url: `${process.env.SITE_URL}/api/plans/subscribe/paypal/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Product",
              sku: "001",
              price: amount,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: amount,
        },
        description: "Payment using PayPal",
      },
    ],
  };

  paypal.payment.create(paymentData, (e, payment) => {
    if (e) {
      res.status(500).json({ success: false, message: e.message });
    } else {
      res.json({ link: payment.links[1].href });
    }
  });
};

const subscribeWithPaypalSuccess = (req, res) => {
  const { PayerID, user_token, paymentId } = req.query;

  const executePayment = {
    payer_id: PayerID,
  };

  paypal.payment.execute(paymentId, executePayment, async (error, payment) => {
    if (error) {
      res.status(500).json({ success: false, message: error.message, error });
    } else {
      // create a bill record in mongodb
      const bill = new Bill({
        user: user_token,
        amount: payment.transactions[0].amount.total,
        payment_method: PAYMENT_METHODS.paypal,
        expire: new Date(),
        paypal: {
          payerId: PayerID,
          paymentId,
          payer_info: payment.payer.payer_info,
        },
      });
      try {
        await bill.save();
        res.status(201).json({ success: true, message: "payment done" });
      } catch (e) {
        res.status(500).json({ success: false, message: e.message });
      }
    }
  });
};

const subscribeWithPaypalCancel = async (req, res) => {
  try {
    res.send("payment cancel...");
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

module.exports = {
  subscribe,
  subscribeWithPaypal,
  subscribeWithPaypalSuccess,
  subscribeWithPaypalCancel,
};
