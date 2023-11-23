const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/:user_id", PostsController.FindPostsByUserId);

module.exports = router;