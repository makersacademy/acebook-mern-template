const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: String,
  time: String,
  message: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
