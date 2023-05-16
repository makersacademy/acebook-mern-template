const mongoose = require("mongoose");

// this defines the structure of the post in the database
const PostSchema = new mongoose.Schema({
  message: { type: String, required: true },
  like: { type: Number, default: 0 },
  time: { type: Date, default: Date.now },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
