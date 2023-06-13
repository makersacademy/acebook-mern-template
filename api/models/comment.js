const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  message: String,
  time: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;