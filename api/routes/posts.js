const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/:post_id", PostsController.FindPostById);
router.get("/", PostsController.Index);
router.post("/:post_id/comment", PostsController.CreateComment);
router.post("/", PostsController.Create);


module.exports = router;
