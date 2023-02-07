const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const User = require("../models/user");

router.post("/", UsersController.Create);
router.get("/", UsersController.Index);

module.exports = router;
