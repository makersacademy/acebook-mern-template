const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: '../frontend/public'});

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.post("/upload-image", upload.single('profilePicture'), UsersController.UploadImage);

module.exports = router;
