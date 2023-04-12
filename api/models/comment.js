const mongoose = require("mongoose");
const Users = require("./user");
const Post = require("./post");

const CommentSchema = new mongoose.Schema({
  postId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts', // this might need to be singular like line 3 but the posts table is plural in the db so not sure what it's linked to.
    immutable: true,
  },
  message: { type: String },
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