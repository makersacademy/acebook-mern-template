const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments');

// router.get("/", CommentsController.Index);
router.post('/', CommentsController.UpdateComment);

module.exports = router;
