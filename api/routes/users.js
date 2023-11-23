const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:userId", UsersController.GetOne);
router.get("/", UsersController.Find);
router.post("/follow", UsersController.Follow);

module.exports = router;
