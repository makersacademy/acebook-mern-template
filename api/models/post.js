const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: Array,
  comments: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
