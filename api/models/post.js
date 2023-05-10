const mongoose = require("mongoose");

// this defines the structure of the post in the database
const PostSchema = new mongoose.Schema({
  message: String
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
