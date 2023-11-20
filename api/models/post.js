// const { Schema } = require("mongoose")

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: { type: String},

  //Updating posts schema to add likes and date/time
  likes: { type: Number, default: 0},
  createdAt: { type: Date, default: Date.now},

  // Modification of posts schema to add user_id
  user_id: {type: mongoose.Types.ObjectId, ref: 'Users'},

  // Modification of posts schema to add image_path
  image_path: { type: String, default: null}
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;