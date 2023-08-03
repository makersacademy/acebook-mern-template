
const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");

const CommentsController = {
  Index: (req, res) => {
    Comment.find((err, comments) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token });
    });
  },
  Create: (req, res) => {
    try {
      const comment = new Comment({
        comment: req.body.comment,
        user: req.body.user,
        post: req.body.post
      });
      comment.save((err) => {
        if (err) {
          // Handle the error and send an appropriate response
          return res.status(500).json({ error: 'Failed to save comment.' });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ comment: 'OK', token: token });
      });
    } catch (err) {
      // Handle any unexpected error
      return res.status(500).json({ error: 'Unexpected error occurred.' });
    }
  },
};

module.exports = CommentsController;
