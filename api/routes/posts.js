// const { MongoClient, Binary } = require('mongodb'); 
const express = require("express");
const router = express.Router();
const PostsController = require("../controllers/posts");

const upload = require('../multerSetup')

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/add", upload.single('img'), PostsController.Upload)
router.get("/:ownerId", PostsController.GetPostOwnerData)
// router.post("/", upload.single('img'), PostsController.Upload, PostsController.Create);

module.exports = router;
