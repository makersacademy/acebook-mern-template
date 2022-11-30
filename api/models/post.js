/**
 * create an instance of mongoose 
 */
const mongoose = require("mongoose");

/**
 * create a schema for Posts
 * it contains a list of the fields that you wish to have in the data
 * e.g. message: {type: String, required: true}
 */
const PostSchema = new mongoose.Schema({
  message: String
});

/**
 * create an instance of the post schema
 * this can then be shared across the app
 */
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
