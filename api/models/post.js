const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Comment = require('../models/comment');

const PostSchema = new mongoose.Schema({
  message: String,
  
  createdAt: Date,
  poster: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User', 
    // postedBy: { type: ObjectId, ref: 'User' }
  }

});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;