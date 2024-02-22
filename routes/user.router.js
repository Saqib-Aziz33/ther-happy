const express = require("express");
const {
  registerValidator,
  loginValidator,
  isLogedin,
  updateTherapistValidator,
} = require("../middlewares/user.middleware");
const {
  register,
  login,
  updateTherapist,
} = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);

router.use(isLogedin);
router.post("/update-therapist", updateTherapistValidator, updateTherapist);

module.exports = router;
