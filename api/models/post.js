const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user_id: String,
  message: String,
  created_at:{
    type: Date, default: Date.now 
  } 
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
