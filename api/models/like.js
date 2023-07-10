const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  username: String,
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
});

const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
