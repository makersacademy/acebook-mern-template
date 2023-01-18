const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/", UsersController.Index);
router.get("/:id", UsersController.GetUserInfo);
router.patch("/:id", UsersController.UpdateUserInfo);

module.exports = router;
