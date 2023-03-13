const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/comment");

router.post("/", CommentController.CreateComment);

module.exports = router;
