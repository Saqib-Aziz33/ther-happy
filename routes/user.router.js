const express = require("express");
const {
  registerValidator,
  loginValidator,
} = require("../middlewares/user.middleware");
const { register, login } = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

module.exports = router;
