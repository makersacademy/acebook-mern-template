const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  //message: String,
  date: { type: Date, required: true },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
