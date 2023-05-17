const mongoose = require("mongoose");

// this defines the structure of the post in the database

const CommentSchema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  date: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  like: { type: Number, default: 0 },
  time: { type: Date, default: Date.now },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  likedBy: { type: [String], default: [] },
  comments: [CommentSchema],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
