const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');

router.post('/comment', PostsController.UpdateComment);
router.get('/', PostsController.Index);
router.post('/', PostsController.Create);

module.exports = router;
