const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: {
    type: Date,
    default: Date.now
  },
  img: {
      data: Buffer,
      contentType: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
