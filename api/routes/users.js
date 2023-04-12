const express = require("express");
const router = express.Router();
const multer = require('multer')
const { v4: uuidv4 } = require('uuid')
const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);
router.get("/", UsersController.Index)


module.exports = router;
