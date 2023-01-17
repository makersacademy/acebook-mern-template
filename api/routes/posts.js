const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/:id", PostsController.GetPostById)
router.post("/", PostsController.Create);

module.exports = router;
