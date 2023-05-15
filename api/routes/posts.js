const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/like", PostsController.AddLike);
router.post("/unlike", PostsController.Unlike);

module.exports = router;
