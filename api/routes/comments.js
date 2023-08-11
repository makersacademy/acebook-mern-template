const express = require("express");
const router = express.Router();
const CommentsController = require("../controllers/comments");
const PostsController = require("../controllers/posts");

router.get("/", CommentsController.Index);
router.post("/", CommentsController.Create);
router.delete("/:id", CommentsController.Delete);

module.exports = router;