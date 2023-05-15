const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: []   // AddComments: Added comments (empty array) to schema 
},
  {
  timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
