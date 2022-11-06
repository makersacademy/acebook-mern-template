const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  timestamp: Date,
  author: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User'
    }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
