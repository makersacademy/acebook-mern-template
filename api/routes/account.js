const express = require("express");
const router = express.Router();

const AccountController = require("../controllers/account");

router.get("/", AccountController.Index);
router.put("/", AccountController.Update);

module.exports = router;
