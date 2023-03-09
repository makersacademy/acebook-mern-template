const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.Index);
router.post("/", UsersController.Create);

module.exports = router;
