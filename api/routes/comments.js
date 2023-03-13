const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comments");

router.get("/:post_id", CommentController.GetCommentByPost);
router.post("/", CommentController.CreateComment);

module.exports = router;
