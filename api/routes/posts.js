const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.get("/following", PostsController.ByFollowing);
router.post("/", PostsController.Create);
router.put("/:id", PostsController.Update);

module.exports = router;
