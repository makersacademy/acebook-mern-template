const express = require("express");

const router = express.Router();

const tokenChecker = require("../middleware/token_checker");

const { createUser, getUser } = require("../controllers/users");

router.post("/", createUser);
router.get("/", tokenChecker, getUser);

module.exports = router;
