const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

// .Index and .Create are keys to methods defined in the PostController object
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.patch("/", PostsController.Update);
router.post("/comments", PostsController.CreateComment);
router.patch("/comments", PostsController.UpdatePost);

module.exports = router;
