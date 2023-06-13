const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

// .Index and .Create are keys to methods defined in the PostController object
router.patch("/comments", PostsController.Update);

module.exports = router;