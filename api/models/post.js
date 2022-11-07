const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  createdAt: Date,
  poster: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      text: String,
      created: { type: Date, default: Date.now },
      // postedBy: { type: ObjectId, ref: 'User' },
    },
  ],
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;