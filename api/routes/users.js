const express = require("express");
const router = express.Router();

const signupUser = require("../controllers/users");

router.post("/", signupUser);

module.exports = router;
