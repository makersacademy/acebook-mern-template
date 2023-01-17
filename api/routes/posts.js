const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);

// liking / unliking a post

router.patch("/like/:id", PostsController.Like);
router.patch("/unlike/:id", PostsController.Unlike);

// retrieves the names of likers of a post

router.get("/likers/:id", PostsController.GetLikers);

module.exports = router;
