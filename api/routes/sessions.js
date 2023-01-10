const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/sessions");

router.get("/", SessionsController.Index);

module.exports = router;