const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.Index);
router.patch("/edit", UsersController.Edit);

module.exports = router;
