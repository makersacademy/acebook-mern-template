const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: { type: String},
  post_id: { type: mongoose.Types.ObjectId, ref: 'Posts'},
  user_id: {type: mongoose.Types.ObjectId, ref: 'Users'},
  createdAt: { type: Date, default: Date.now},
  likes: { type: Number, default: 0},


});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;