const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/comments", PostsController.CreateComment);
router.patch("/:id", PostsController.Update);

module.exports = router;
