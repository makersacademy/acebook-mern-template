const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    immutable: true,
    required: true,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
