const Comment = require("../models/comment").Comment;
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  Create: async (req, res) => {
    const comment = new Comment();
    comment.author = req.user_id;
    comment.message = req.body.message;
    const post = await Post.findById(req.body.post_id);
    post.comments.push(comment);
    await post.save();
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({comment: comment, post: post, token: token})
    // res.status(201).json({ message: 'Comment Added', token: token });
  },

  /*
  get CreateComment() {
    return this.Create;
  },

  set CreateComment(value) {
    this.Create = value;
  },
  */
}

module.exports = CommentsController;