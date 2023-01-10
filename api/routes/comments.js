const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments');

router.post('/', CommentsController.AddComment);

module.exports = router;
