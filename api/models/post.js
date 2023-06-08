const mongoose = require("mongoose");
// const tokenDecoder = require("./token_decode");


const PostSchema = new mongoose.Schema({
  message: String,
  author: mongoose.Schema.Types.ObjectId
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
