const express = require("express");
const router = express.Router();

// creates PostsController in order to use getPostsByUsername
const PostsController = require("../controllers/posts");


router.get("/", PostsController.findPostsByUserId);


module.exports = router;
