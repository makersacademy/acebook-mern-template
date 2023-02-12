const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: String,
  post_id: Number
}, { timestamps: true });

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
