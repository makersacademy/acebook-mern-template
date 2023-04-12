const express = require("express");
const router = express.Router();
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const UsersController = require("../controllers/users");

const upload = require('../multerSetup')

router.post("/", upload.single('profilePicture'), UsersController.Create);


module.exports = router;
