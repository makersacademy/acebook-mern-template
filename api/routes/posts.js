const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.delete("/", PostsController.Delete);
router.put("/", PostsController.Update);
router.patch("/", PostsController.Likes); //Patch is like put, but it's only small changes - it does a refresh.
module.exports = router;