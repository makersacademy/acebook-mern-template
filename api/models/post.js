const mongoose = require("mongoose");
//const { ObjectId } = require ("mongoose")

const PostSchema = new mongoose.Schema({
  message: String, 
  comments: [],   // AddComments: Added comments (empty array) to schema 
  authorUserID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
},
  {

    timestamps: true
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
