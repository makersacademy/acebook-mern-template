const mongoose = require("mongoose");
const CommentSchema = require("./comment").CommentSchema;

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [CommentSchema]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


 
