const express = require("express");

const router = express.Router();

const { getAllPosts, createPost, likePost } = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);
router.post("/like", likePost);

module.exports = router;
