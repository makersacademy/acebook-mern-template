const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({

  message: {
    type: String
  },

  postedBy: {
    type:ObjectId

  },

  likes: [{
    type: ObjectId, 
    ref: "Users"
  }],
  photo: {
    type: String,
    default: ""
  },

  comments:[{
    text: String,
    postedBy: {type:ObjectId, ref:"User"}
      }]
});

const Post = mongoose.model("Post", PostSchema);




module.exports = Post;
