// const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  likes: {
    type: Number,
    default: 0
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
