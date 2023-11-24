const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);

router.post("/", PostsController.Create);

// new route for liking a post
router.post("/like/:_id", PostsController.likePost);
// router.post("/:_id/like/:user_id", (req, res) => {
//     console.log("Route - postId:", req.params._id);
//     PostsController.likePost(req, res);
// });
module.exports = router;
