const express = require("express");

const router = express.Router();

const {
  getAllPosts,
  createPost,
  createComment,
  getPostComments,
} = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/comment", createComment);
router.get("/comment", getPostComments);

module.exports = router;
