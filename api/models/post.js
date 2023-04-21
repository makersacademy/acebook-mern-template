const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    default: "User"
  },
  message: String,
  likes: {
    type: [String], 
    default: []
  },
  comments: {
    type: Array,
    default: []
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
