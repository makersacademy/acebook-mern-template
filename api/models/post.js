const mongoose = require("mongoose");
const Comments = require("./comment");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;