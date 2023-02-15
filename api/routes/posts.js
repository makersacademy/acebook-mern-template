const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/:id/comment", PostsController.AddComment);
router.delete("/:id", PostsController.Delete);
router.put("/:id/like", PostsController.Addlike);
router.put("/:id/unlike", PostsController.Unlike);


module.exports = router;
