const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.get("/user", PostsController.IndexByUserId);
router.put("/:id", PostsController.Comment);
router.put("/:id/likes", PostsController.Likes);

module.exports = router;
