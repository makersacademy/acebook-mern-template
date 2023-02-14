const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  userName: String,
  comments: [{ userName: String, timeStamp: Date, message: String }],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
