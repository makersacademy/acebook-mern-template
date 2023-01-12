const express = require("express");
const router = express.Router();
const TokensController = require("../controllers/tokens");

const { loginUser, signupUser } = require('../controllers/users')

router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
