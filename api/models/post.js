const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {
    type: String
  },
  likes: [{
    type: ObjectId, 
    ref: "Users"
  }],
  photo: {
    type: String,
    default: ""
  }
});

const Post = mongoose.model("Post", PostSchema);




module.exports = Post;
