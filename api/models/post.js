// const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        createdAt: { type: Date, default: Date.now },
        likes: {
          type: Number,
          default: 0,
        },
        likedBy: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }],
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
