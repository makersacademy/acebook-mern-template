// const { Schema } = require("mongoose")

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String},
  // likes: { type: Number, default: 0}, commented out the orignal in case I break it
  //Updating posts schema to add likes and date/time
  likes: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
  createdAt: { type: Date, default: Date.now},

  // Modification of posts schema to add user_id

  user_id: {type: mongoose.Types.ObjectId, ref: 'Users'},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;