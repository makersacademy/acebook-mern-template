/**
 * initiate Express and access the router method
 */
const express = require("express");
const router = express.Router();

// import users controller (which contains user methods)
const UsersController = require("../controllers/users");

// route equivalent to POST /users/
router.post("/", UsersController.Create);

module.exports = router;
