const mongoose = require("mongoose");
const {Schema} = mongoose

const CommentSchema = new Schema({
  comment: String,
  poster: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
}, {
  timestamps: true
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
