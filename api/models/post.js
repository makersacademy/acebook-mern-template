const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likeCount: Number
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
