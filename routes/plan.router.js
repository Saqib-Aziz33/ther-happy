const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/plan.controller");
const { subscribeValidator } = require("../middlewares/plan.middleware");
const { isLogedin } = require("../middlewares/user.middleware");

// router.route("/").get().post();

router.use(isLogedin);
router.post("/subscribe", subscribeValidator, subscribe);

module.exports = router;
