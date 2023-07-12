const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/:id", UsersController.Profile);
router.post("/", UsersController.Create);

module.exports = router;
