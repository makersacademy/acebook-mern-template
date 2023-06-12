const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:user_Id/username", UsersController.GetUsername);

module.exports = router;
