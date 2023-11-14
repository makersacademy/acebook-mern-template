const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,

  // Modification of posts schema to add user_id
  // will need to get it from the token/login info when post is made... 
  user_id: Number,

  // modification to posts to add user_id - in theory will input current date and time when post is created
  time_posted: Date
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
