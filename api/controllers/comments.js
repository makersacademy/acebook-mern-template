const TokenGenerator = require("../lib/token_generator");
const Comment = require("../models/comment");

const CommentsController = {
  IndexByPostId: async (req, res) => {
    const post_id = req.params.post_id;
    const comments = await Comment.find({post_id:post_id});
    const token = TokenGenerator.jsonwebtoken(req.user_id)

    if (!comments) {
      return res.status(400).json({message: "No comments yet - be the first!"});
    }
    else {
      res.status(200).json({ comments: comments, token: token });
    }
  },

  Create: (req, res) => {
    const user_id = req.user_id;
    const post_id = req.params.post_id;
    const comment = new Comment ({
      ...req.body,
      user_id: user_id,
      post_id: post_id
    })
    comment.save((err) => {
      if (err) {
        throw err;
      }
    const token = TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: "OK", token: token });
    });
  }
}

module.exports = CommentsController
