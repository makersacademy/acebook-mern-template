const mongoose = require("mongoose");

const PostLikeSchema = new mongoose.Schema({
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

const PostLike = mongoose.model("PostLike", PostLikeSchema);

module.exports = PostLike;
