const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
