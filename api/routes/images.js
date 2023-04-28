const express = require("express");
const router = express.Router();

const imagesController = require("../controllers/images");

router.post("/", imagesController.Create);

module.exports = router;
