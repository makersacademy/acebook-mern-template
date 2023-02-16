const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/", UsersController.Find);
router.post("/bio/:id", UsersController.UpdateBio);

module.exports = router;
