const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userName: String,
    comments: [{ userName: String, timeStamp: Date, message: String }],
    imageURL: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
