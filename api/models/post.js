const mongoose = require("mongoose");

const CommentsSchema = new mongoose.Schema({
  message: String,
});

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [CommentsSchema],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
