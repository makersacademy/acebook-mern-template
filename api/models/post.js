const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Comment = require('../models/comment');
// const Image = require('./image')

const PostSchema = new mongoose.Schema({
  message: String,
  poster: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  //upload
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
    },
  ],
  imageUrls: [String]
}, {timestamps: true});
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;