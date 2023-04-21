const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/like", PostsController.Like);
router.post("/:id/comment", PostsController.Comment);

module.exports = router;
