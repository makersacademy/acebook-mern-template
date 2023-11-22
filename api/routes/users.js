const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/:userId", UsersController.GetOne);
router.get("/", UsersController.Find);
router.post("/update", UsersController.Update);

module.exports = router;
