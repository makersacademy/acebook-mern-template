const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  dateCreated: {
    type: Date,
    default: () => Date.now()
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;