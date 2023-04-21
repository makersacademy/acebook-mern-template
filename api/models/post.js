const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: [{type:ObjectId, ref: "Users"}]
});

const Post = mongoose.model("Post", PostSchema);




module.exports = Post;
