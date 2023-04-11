const mongoose = require("mongoose");
const Users = require("./user");
const Post = require("./post");

const CommentSchema = new mongoose.Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts',
    immutable: true,
  },
  message: { type: String },
  image: {
    contentType: String,
    fileName: String,
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    immutable: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  likes: {
    type: Number,
    default: 0,
  },

});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;