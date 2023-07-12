const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  photo: { type: String, required: false },
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: String,
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
