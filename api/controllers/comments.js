const Comment = require("../models/comment");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  Create: async (req, res) => {
    console.log("here")
    const comment = new Comment();
    comment.author = req.params.userId;
    comment.message = req.body.message;
    const postId = req.params.postId;
    console.log(postId)
    const post = await Post.findById(postId);

    post.comments.push(comment);
    await post.save();

    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: 'Comment Added', token: token });
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