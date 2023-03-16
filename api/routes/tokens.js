const express = require("express");

const router = express.Router();

const { login } = require("../controllers/tokens");

router.post("/", login);

module.exports = router;
