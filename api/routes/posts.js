const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/add-comment", PostsController.addCommentToPost);
router.post("/add-like", PostsController.UpdateLike);

module.exports = router;

// addComment controller invoked in here