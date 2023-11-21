const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  comments: [{ comment_message: String, date: { type: Date, default: Date.now }}],
  likes: { type: Number, default: 0 },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  likes: { type: Number, default: 0 }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
