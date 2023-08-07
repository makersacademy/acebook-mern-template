const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {type: String , required : true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [ { type: mongoose.Schema.Types.ObjectId}]

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
