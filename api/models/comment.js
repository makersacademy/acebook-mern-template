const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  message: { type: String },
});

Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
