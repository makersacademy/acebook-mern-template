const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  createPost,
  createComment,
  getPostComments,
  likePost,
  dislikePost,
} = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/comment", createComment);
router.get("/comment", getPostComments);
router.post("/like", likePost);
router.delete("/like", dislikePost);

module.exports = router;
