const Comment = require('../models/comment');
const TokenGenerator = require('../models/token_generator');

const CommentController = {
  Create: (req, res) => {
    res.status(201).send({});
  },
};

module.exports = CommentController;
