const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.get("/comments", CommentsController.Find_By_Post_Id);
router.post("/", CommentsController.Create);
module.exports = router;
