const mongoose = require("mongoose");

const Post = mongoose.model('Post', new mongoose.Schema({
  title: String, 
  content: String, 
  photo: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments:[{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comment'
  }],
  likes: {type: Number, default: 0}
  ,
  likers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }] },
    {
    timestamps: true
}));

module.exports = Post;
