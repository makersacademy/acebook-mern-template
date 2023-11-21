const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);

router.post("/", PostsController.Create);

// new route to post image filename in post database
router.post("/image", PostsController.AddImage);

module.exports = router;
