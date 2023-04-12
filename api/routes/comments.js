const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");

const upload = require('../multerSetup')

router.post("/", upload.single('img'), CommentsController.Create)
router.get("/:postId", CommentsController.GetCommentsByPostId);


module.exports = router;