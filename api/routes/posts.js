const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/comment", PostsController.AddComment);
router.delete("/:id", PostsController.Delete);

module.exports = router;
