const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const {CommentSchema} = require("./comment");

const PostSchema = new mongoose.Schema({
  message: String,
  comments: [{type: CommentSchema}]
}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
