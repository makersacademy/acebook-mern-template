const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: String,
  user_id: String,
  comments: [{ user_id: String, comment: String }],
});

// const commentsSchema = new mongoose.Schema({
//   comment: String,
//   user_id: String,
// });


const Post = mongoose.model("Post", PostSchema);
// const Comments = mongoose.model("Comments", commentsSchema);

module.exports = Post;
