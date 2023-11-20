const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/:post_id", CommentsController.Create);
router.get("/:post_id", CommentsController.IndexByPostId);

module.exports = router;
