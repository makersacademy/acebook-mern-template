const express = require("express");
const router = express.Router();

const CommentLikesController = require("../controllers/commentlikes");

router.get("/", CommentLikesController.Index);
router.post("/", CommentLikesController.Like);
router.delete("/", CommentLikesController.Unlike);

module.exports = router;
