const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");
const CommentsRoute = require("../routes/comments");

// Posts / :post_id
router.get("/:post_id", PostsController.Find);
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);


module.exports = router;
