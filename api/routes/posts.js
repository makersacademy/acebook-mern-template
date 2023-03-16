const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/:id", PostsController.GetPost);
router.post("/", PostsController.Create);
router.post("/:id/likes", PostsController.ToggleLike);
router.post("/:id/comments", PostsController.CreateComment);

module.exports = router;
