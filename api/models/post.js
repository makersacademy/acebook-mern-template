const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new mongoose.Schema({
  name: String,
  message: { type: String}, 
  date: {
    type: Date,
    default: Date.now
  },
  img: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  likes:  Array,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }] 
});

// PostSchema.virtual('url').get(() => {
//   return '/post/' + this._id
// })

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
