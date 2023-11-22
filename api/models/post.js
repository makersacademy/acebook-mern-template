const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  commenter: {
    comment_message: String,
    date: {
      type: Date,
      default: Date.now,
    },
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // TODO: Evaluate whether the displayName field is necessary here
    displayName: String,
  },
})

const PostSchema = new mongoose.Schema({
  message: String,
  image: String, // Store the base64-encoded
  date: { type: Date, default: Date.now },
  //comments: [{ comment_message: String, date: { type: Date, default: Date.now }}],
  likes: { type: Number, default: 0 },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  comments: [CommentSchema],
  /* likes: { type: Number, default: 0 } */ // Repeated line
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
