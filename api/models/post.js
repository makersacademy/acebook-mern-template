const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  name: String,
  message: { type: String }, 
  date: {
    type: Date,
    default: Date.now
  },
  img: {
      data: Buffer,
      contentType: String
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes:  Array
  });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
