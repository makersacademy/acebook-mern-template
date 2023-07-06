const NotificationController = require("../controllers/notifications");

const express = require("express");
const router = express.Router();

router.get("/", NotificationController.Index);

module.exports = router;
