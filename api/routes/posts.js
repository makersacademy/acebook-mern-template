const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  getSinglePost,
  createPost,
  createComment,
  getPostComments,
  likePost,
  dislikePost,
} = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/comment", createComment);
router.post("/like", likePost);
router.delete("/like", dislikePost);
router.get("/:postId/comments", getPostComments);
router.get("/:postId", getSinglePost);

module.exports = router;
