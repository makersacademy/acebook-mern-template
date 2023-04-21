const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/like", PostsController.LikePost);
router.put("/unlike", PostsController.UnlikePost);
router.put("/comment", PostsController.CommentPost)
//router.delete("/", PostsController.Delete);
// router.update('/', PostsController.Update);

module.exports = router;
