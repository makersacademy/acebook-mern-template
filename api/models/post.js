const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  message: String,
  imageUrl: String,
  time: Date,
  likes: { type: [String], default: [] },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", default: [] }],
});

const Post = mongoose.model("Post", PostSchema)

module.exports = Post;
