const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  createdDateTime: Date
})

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = CommentSchema;