const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.patch("/:id", PostsController.Update)
router.get("/:id", PostsController.FindUsersPosts);

module.exports = router;
