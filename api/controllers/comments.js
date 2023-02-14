const Comment = require('../models/comment');
const TokenGenerator = require('../models/token_generator');

const CommentController = {
  Create: (req, res) => {
    const comment = new Comment(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.body.user_id);
      res.status(201).send({ message: 'OK', token: token });
    });
  },
};

module.exports = CommentController;
