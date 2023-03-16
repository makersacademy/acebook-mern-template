const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  createPost,
  likePost,
  dislikePost,
} = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/like", likePost);
router.delete("/like", dislikePost);

module.exports = router;
