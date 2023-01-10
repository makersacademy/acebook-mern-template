const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const PostSchema = new mongoose.Schema({
  message: String,
  poster: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
    },
  ],
}, {timestamps: true});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;