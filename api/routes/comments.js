const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/", CommentsController.Create);
router.get("/", CommentsController.Find_By_Post_Id);
module.exports = router;
