const { body } = require("express-validator");

const subscribeValidator = [
  body("token").notEmpty().withMessage("token is required"),
  body("price").notEmpty().withMessage("price is required"),
];

module.exports = {
  subscribeValidator,
};
