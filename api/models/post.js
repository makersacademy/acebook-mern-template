const mongoose = require('mongoose');
const Comment = require('../models/comment');

const PostSchema = new mongoose.Schema(
  {
    message: String,
    comments: String
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    //   },
    // ],
  }
  // Timestamps commented out for simplicity 
  // ,
  // { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
