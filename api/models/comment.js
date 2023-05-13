const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  comment: { type: String, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;