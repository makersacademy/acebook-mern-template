const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  message: String,
  time: Date,
  likes: { type: [String], default: [] },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
