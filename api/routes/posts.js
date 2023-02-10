const express = require("express");
const router = express.Router();

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.delete("/", PostsController.Delete);
router.put("/", PostsController.Update);
router.patch("/like", PostsController.Likes); 
router.patch("/unlike", PostsController.Unlikes);
module.exports = router;