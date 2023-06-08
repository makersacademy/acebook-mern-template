const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.get("/", UserController.Index);

module.exports = router;