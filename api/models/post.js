const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  created: { type: Date, default: Date.now() },
  likes: [],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
