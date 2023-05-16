const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdDateTime: Date
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
