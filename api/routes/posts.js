const express = require("express");
const router = express.Router();
const multer = require('multer'); //for image upload 

const PostsController = require("../controllers/posts");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('image'), PostsController.Create);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/user", PostsController.IndexByUserId);
router.put("/:id", PostsController.Comment);
router.put("/:id/likes", PostsController.Likes);
router.get("/:id/likes", PostsController.GetLikes);



module.exports = router; 
