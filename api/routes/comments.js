const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");

const upload = require('../multerSetup')

router.get("/:postId", CommentsController.GetCommentsByPostId);
router.post("/:postId", CommentsController.Create);

module.exports = router;