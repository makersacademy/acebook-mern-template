const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users");

router.post("/", UsersController.upload, usersController.UsersController.Create);

module.exports = router;
