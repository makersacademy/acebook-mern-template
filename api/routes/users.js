const express = require("express");

const router = express.Router();

const { createUser, getUser } = require("../controllers/users");

router.post("/", createUser);

router.get("/", getUser);

module.exports = router;
