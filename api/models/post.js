const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
});

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [CommentsSchema],
  likeCount: {type: Number, default: 0}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;

// get comment ability in here