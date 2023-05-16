const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/likes", PostsController.AddLikes);
router.delete("/:id/likes", PostsController.RemoveLikes);
router.post("/:id/comments", PostsController.CreateComment);

module.exports = router;
