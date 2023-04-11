const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  dateCreated: { type: Number, default: () => Math.floor(Date.now() / 1000) }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
