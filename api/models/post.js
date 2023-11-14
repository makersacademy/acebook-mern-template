const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  date_posted: {
    type: Date
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
