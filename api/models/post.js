const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String },
  dateCreated: { type: Date, default: Date.now },
  likeCount: {type: Number, default: 0 },
  author: { type: String }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
