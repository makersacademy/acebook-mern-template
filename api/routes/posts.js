const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Update);
router.post("/:id/like", PostsController.Like);
router.delete("/:id", PostsController.Delete);

module.exports = router;
