const TokenGenerator = require('../models/token_generator');
const Comment = require('../models/comment');
const Post = require('../models/post');

const CommentController = {
  Create: (req, res) => {
    const comment = new Comment(req.body);
    const comment_id = comment._id;
    comment.save(async (err) => {
      if (err) {
        res.send(err);
      }
      Post.findOneAndUpdate(
        { _id: req.body.post_id },
        { $push: { comments: comment_id } },
        (err) => {
          if (err) {
            res.send(err);
          }
          const token = TokenGenerator.jsonwebtoken(req.body.user_id);
          res.status(201).json({ message: 'OK', token: token });
        }
      );
    });
  },
};

module.exports = CommentController;
