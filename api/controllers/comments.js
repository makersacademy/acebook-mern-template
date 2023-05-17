const Comment = require("../models/comment");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  _CreateComment: async (req, res) => {
    const comment = new Comment(req.body);
    comment.author = req.params.userId;
    comment.message = req.body.value;
    const postId = req.params.postId;
    const post = await Post.findById(postId);

    post.comments.push(comment);
    await post.save();

    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: 'Comment Added', token: token });
  },
  get CreateComment() {
    return this._CreateComment;
  },
  set CreateComment(value) {
    this._CreateComment = value;
  },
}

module.exports = CommentsController