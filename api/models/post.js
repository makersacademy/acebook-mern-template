const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  newPost: { message: String, required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
