const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();
const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", upload.single("image"), PostsController.Create);
router.get("/image/:postId", PostsController.GetImage);
router.put("/:postId/like", PostsController.UpdateLikes);

module.exports = router;
