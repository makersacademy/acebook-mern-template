const mongoose = require("mongoose");

// this defines the structure of the post in the database

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  like: { type: Number, default: 0 },
  likedBy: { type: [String], default: [] },
  comments: [CommentSchema],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
