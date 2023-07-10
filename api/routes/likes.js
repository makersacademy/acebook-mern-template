const express = require("express");
const router = express.Router();

const LikesController = require("../controllers/likes");

router.get("/", LikesController.Index);
router.post("/", LikesController.Create);
router.post("/:postId/unlike", LikesController.Unlike);

module.exports = router;
