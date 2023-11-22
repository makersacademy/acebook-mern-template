const mongoose = require("mongoose");

// NOTE: SCHEMA REFACTOR
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
  comments: [CommentSchema], // NOTE: SCHEMA REFACTOR
  /* likes: { type: Number, default: 0 } */ // Repeated line
  // comments: [
  //   {
  //     comment_message: String,
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //     commenter: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     displayName: String,
  //   }
  // ]
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
