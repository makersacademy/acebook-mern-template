const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Update);
router.post("/:id", PostsController.PostComment);
router.get("/:id", PostsController.Get);

module.exports = router;
