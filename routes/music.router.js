const { getAll } = require("../controllers/music.controller");

const express = require("express");
const router = express.Router();

router.get("/", getAll);

module.exports = router;
