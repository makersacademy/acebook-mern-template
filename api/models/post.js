const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      // postedBy: { type: ObjectId, ref: 'User' },
    },
  ],
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
