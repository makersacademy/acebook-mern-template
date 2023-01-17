const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    likes: {
      type: Array,
      default: [],
      required: false,
    },
    comments: {
      type: Array,
      default: [],
      required: false,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
