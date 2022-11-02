const Comment = require('../models/comment');
const TokenGenerator = require('../models/token_generator');

const CommentsController = {
  // return all comments (not sure if needed??)
  Index: (req, res) => {
    Comment.find(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ comments: comments, token: token });
    });
  },
  // create new post
  Create: (req, res) => {
    const comment = new Post(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = CommentsController;
