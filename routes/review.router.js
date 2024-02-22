const express = require("express");
const { isLogedin } = require("../middlewares/user.middleware");
const { getAll, addNew } = require("../controllers/review.controller");
const { ratingValidator } = require("../middlewares/review.middleware");
const router = express.Router();

router.use(isLogedin);

router.route("/").get(getAll).post(ratingValidator, addNew);

module.exports = router;
