const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  message: {type: String , required : true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref:'Comment' }]
});

const Post = mongoose.model("Post", PostSchema);



module.exports = Post;
