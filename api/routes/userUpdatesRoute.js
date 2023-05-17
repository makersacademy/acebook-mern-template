const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/userUpdates");

router.put("/", UsersController.Update);
router.delete("/", UsersController.Delete);

module.exports = router;
