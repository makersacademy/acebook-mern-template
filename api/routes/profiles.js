const express = require("express");
const router = express.Router();

const ProfilesController = require("../controllers/profiles.js");

router.get("/", ProfilesController.viewUser);

module.exports = router;
