// Require mongoose package 
const mongoose = require('mongoose')

// Create a new schema for comments
const CommentSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true 
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
    },
    image: {
      type: String
   },
    post_id: {
      type: mongoose.Schema.Types.ObjectId, ref: 'Post',
      required: true
    }

  },
  {timestamps: true}
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;