const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:id/like", PostsController.NewLike);
router.put("/:id/unlike", PostsController.Unlike);

module.exports = router;
