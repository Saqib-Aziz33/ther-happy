const { body } = require("express-validator");

const ratingValidator = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .notEmpty()
    .withMessage("rating is required"),
];

module.exports = {
  ratingValidator,
};
