const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.patch("/:id", PostsController.Update);    //AddComment: update post with new comment

module.exports = router;
