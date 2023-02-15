const express = require('express');
const router = express.Router();

const CommentController = require('../controllers/comments');

router.post('/', CommentController.Create);
router.patch('/like', CommentController.Like)
router.patch('/unlike', CommentController.Unlike)

module.exports = router;
