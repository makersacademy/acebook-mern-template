const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsController = require("../controllers/comments")

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.AddLike);
router.post("/unlike", PostsController.Unlike);
router.post("/comments", CommentsController.Create);
router.delete("/delete", PostsController.Delete);

module.exports = router;
