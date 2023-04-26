const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put('/update', PostsController.Update);
router.put("/like", PostsController.LikePost);
router.put("/unlike", PostsController.UnlikePost);
router.put("/comment", PostsController.CommentPost)
router.delete("/delete", PostsController.Delete);
router.get("/search", PostsController.FindSearch);

module.exports = router;
