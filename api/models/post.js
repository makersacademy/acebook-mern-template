const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  likes: Array,
  comments: Array,
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;