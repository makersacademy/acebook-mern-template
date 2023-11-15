// const { Schema } = require("mongoose")

const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,

  // Modification of posts schema to add user_id

  user_id: {type: mongoose.Types.ObjectId, ref: 'Users'},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;