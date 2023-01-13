const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  likes: Array,
  comments: Array,
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;