const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");

const upload = require('../multerSetup')

router.get("/", CommentsController.Index);
router.post("/", upload.single('img'), CommentsController.Create)
router.get("/:postId", CommentsController.GetCommentByPostId);


module.exports = router;