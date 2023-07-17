const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/", CommentsController.Index);
router.post("/", CommentsController.Create);
router.put("/:commentId/like", CommentsController.UpdateLikes);

module.exports = router;
