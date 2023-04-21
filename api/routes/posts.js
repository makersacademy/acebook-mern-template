const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.delete("/", PostsController.Delete);
router.put("/like", PostsController.LikePost);
router.put("/unlike", PostsController.UnlikePost);
// router.update('/', PostsController.Update);

module.exports = router;
