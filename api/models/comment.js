const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  time: String,
  comment: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
