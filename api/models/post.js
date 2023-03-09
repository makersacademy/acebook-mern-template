const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, default: Date.now }, //timestamp
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
