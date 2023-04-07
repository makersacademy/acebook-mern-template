const mongoose = require("mongoose");
const Users = require("./user");

const PostSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
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
  comments: {
    type: Number,
    default: 0,
  }

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
