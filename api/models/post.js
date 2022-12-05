const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  time: Number,
  posterUserId: String,
  comments: [  
    {
   time: { type: Number },
   user: { type: String },
   comment: { type: String },
  }, 
],
  likes: Array
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
