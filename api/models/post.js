const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  likes: [{type:ObjectId, ref: "User"}],
  comments:[{
    text: String,
    postedBy: {type:ObjectId, ref:"User"}
  }]
});

const Post = mongoose.model("Post", PostSchema);




module.exports = Post;
