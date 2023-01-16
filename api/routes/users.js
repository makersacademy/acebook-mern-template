const express = require("express");
const router = express.Router();
const TokensController = require("../controllers/tokens");

const { loginUser, signupUser, findUser } = require('../controllers/users')

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/:id", findUser)

module.exports = router;
