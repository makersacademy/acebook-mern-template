const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  comment: String,
  post_id: String,
  user_id: String,
}, { timestamps: true });

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
