const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const PostSchema = new mongoose.Schema({
  message: { type: String },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    immutable: true,
    required: true,
  },
  createdAt: { type: Date, default: () => Date.now(), immutable: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  image: { type: String },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
