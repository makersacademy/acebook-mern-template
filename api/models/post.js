const mongoose = require("mongoose");
const Users = require("./user");
const { ObjectID } = require("mongodb");

const PostSchema = new mongoose.Schema({
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
  liked: {
    type: Number,
    default: 0,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  }],

  comments: {
    type: Number,
    default: 0,
  }

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
