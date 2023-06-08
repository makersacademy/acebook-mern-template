const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
});

const Comment = mongoose.model("Comment", CommentsSchema);
module.exports = Comment;