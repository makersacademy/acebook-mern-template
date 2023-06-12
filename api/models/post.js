const mongoose = require("mongoose");
// const tokenDecoder = require("./token_decode");


const PostSchema = new mongoose.Schema({
  message: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  } 
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
