const express = require("express");
const router = express.Router();
const {
  subscribe,
  subscribeWithPaypal,
  subscribeWithPaypalSuccess,
  subscribeWithPaypalCancel,
} = require("../controllers/plan.controller");
const { subscribeValidator } = require("../middlewares/plan.middleware");
const { isLogedin } = require("../middlewares/user.middleware");

// router.route("/").get().post();

router.post("/subscribe", isLogedin, subscribeValidator, subscribe);
router.post("/subscribe/paypal", isLogedin, subscribeWithPaypal);

router.get("/subscribe/paypal/success", subscribeWithPaypalSuccess);
router.get("/subscribe/paypal/cancel", subscribeWithPaypalCancel);

module.exports = router;
