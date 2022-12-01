const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  time: Number
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
