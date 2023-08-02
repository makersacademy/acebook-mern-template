const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);

// create get route with a named parameter :id, calls GetUser method on UsersController
router.get("/:id", UsersController.GetUser);

module.exports = router;
