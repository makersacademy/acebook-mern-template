const express = require("express");
const router = express.Router();

const CommentLikesController = require("../controllers/commentlikes");

router.get("/", CommentLikesController.Index);
router.post("/", CommentLikesController.Create);
router.delete("/", CommentLikesController.Delete);

module.exports = router;
