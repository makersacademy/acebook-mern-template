const express = require("express");
const router = express.Router();

const UploadsController = require("../controllers/uploads");

router.post("/", UploadsController.AddImage);


module.exports = router;
