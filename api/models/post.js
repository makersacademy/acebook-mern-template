const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    author: {
      // Expects to recieve a valid user ID from the User Schema
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
