const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user_id: { type: String, required: true },
  post_id: { type: String, required: true },
  }
);
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
