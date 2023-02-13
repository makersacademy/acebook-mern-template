const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  content: String,
  author:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
});

module.exports = CommentSchema;



