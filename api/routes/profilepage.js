const express = require("express");
const router = express.Router();

const ProfilePageController = require("../controllers/profilepage");

router.get("/", ProfilePageController.Index);

module.exports = router;
