const express = require("express");
const router = express.Router();

const PostLikesController = require("../controllers/postlikes");

router.get("/", PostLikesController.Index);
router.get("/:postId", PostLikesController.FindPostLike);
router.post("/", PostLikesController.Create);
router.delete("/", PostLikesController.Delete);

module.exports = router;
