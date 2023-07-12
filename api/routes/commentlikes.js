const express = require("express");
const router = express.Router();

const CommentLikesController = require("../controllers/commentlikes");

router.get("/", CommentLikesController.Index);
router.get("/:commentId", CommentLikesController.FindCommentLike);
router.post("/", CommentLikesController.Like);
router.delete("/", CommentLikesController.Unlike);

module.exports = router;
