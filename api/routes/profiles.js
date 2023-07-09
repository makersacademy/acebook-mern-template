const express = require("express");
const router = express.Router();

const ProfileController = require("../controllers/profiles");

// Define routes for profiles
router.get("/", ProfileController.GetProfile);

module.exports = router;
