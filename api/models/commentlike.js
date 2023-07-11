const mongoose = require("mongoose");

const CommentLikeSchema = new mongoose.Schema({
  username: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  likes: {
    type: Array,
    default: [], // Initialize the likes array as an empty array
  },
});

const CommentLike = mongoose.model("CommentLike", CommentLikeSchema);

module.exports = CommentLike;
