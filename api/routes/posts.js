const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

// .Index and .Create are keys to methods defined in the PostController object
router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.patch("/", PostsController.Update);
router.patch("/", PostsController.UpdateComment);

module.exports = router;
