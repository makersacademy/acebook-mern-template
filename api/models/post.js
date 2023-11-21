const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  date: { type: Date, default: Date.now },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  },
  comments: [{ comment_message: String, date: { type: Date, default: Date.now }, 
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }, username: String }],
  

});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
