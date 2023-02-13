const mongoose = require("mongoose")

const Comment = mongoose.model('Comment', new mongoose.Schema({
    content: String,
    author:{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    },
    likes: {
      type: Number,
      default: 0
    },
    likers:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    }]
  }));

  module.exports = Comment;