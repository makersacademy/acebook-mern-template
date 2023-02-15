const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userName: String,
    comments: [{ userName: String, timeStamp: Date, message: String }],
    likes: [{}]        
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
