const express = require("express");
const router = express.Router();

const CommentsController = require("../controllers/comments");

router.post("/:id", CommentsController.Create);

module.exports = router;
