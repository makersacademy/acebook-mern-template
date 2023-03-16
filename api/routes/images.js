const express = require("express");

const router = express.Router();

const { uploadImage, getAllImages } = require("../controllers/images");

router.get("/", getAllImages);
router.post("/", uploadImage);

module.exports = router;
