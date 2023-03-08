const express = require("express");

const router = express.Router();

const { getAllPosts, createPost } = require("../controllers/posts");

router.get("/", getAllPosts);
router.post("/", createPost);

module.exports = router;
