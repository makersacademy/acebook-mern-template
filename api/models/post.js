const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: String,
  comments: [{ user_id: String, comment: String }],
});


const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
