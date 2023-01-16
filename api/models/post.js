const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    message: {
     type: String,
     required: true 
    },
    author: {
      // Expects to recieve a valid user ID from the User Schema 
      type: mongoose.Schema.Types.ObjectId, ref: 'User',
      required: true
     },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
