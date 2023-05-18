const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  message: String,
  // createdDateTime: Date,
  // user: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Comment = mongoose.model("Comment", CommentSchema);
// const comment = new Comment({message:'First Comment'}).save() test for commenting

module.exports = {Comment:Comment, CommentSchema:CommentSchema};