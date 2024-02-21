const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/plan.controller");
const { subscribeValidator } = require("../middlewares/plan.middleware");

// router.route("/").get().post();

router.post("/subscribe", subscribeValidator, subscribe);

module.exports = router;
