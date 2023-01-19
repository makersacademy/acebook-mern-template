const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    message: {
      type: String
    },
    likes: {
      type: Array,
      default: []
    },
    comments: {
      type: Array,
      default: []
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
