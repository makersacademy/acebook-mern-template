const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userName: String,
  time: Date,
  message: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
