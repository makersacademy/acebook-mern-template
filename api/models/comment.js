const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  post_id: { type: mongoose.Types.ObjectId, required: true, ref: 'Post' },
  message: { type: String },
});

Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
