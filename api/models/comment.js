const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  username: String,
  time: String,
  message: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
