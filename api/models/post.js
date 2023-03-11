const mongoose = require("mongoose");
const {Schema} = mongoose

const PostSchema = new Schema({
  message: String,
  poster: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
  timestamps: true
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
