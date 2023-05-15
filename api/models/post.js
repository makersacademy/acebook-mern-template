const mongoose = require("mongoose");
//const { ObjectId } = require ("mongoose")

const PostSchema = new mongoose.Schema({
  message: String}, 
  { timestamps: true },
 { authorUserID: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}}
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;



// postedBy: {
//   type: mongoose.Schema.Types.ObjectId,
//   ref: "User"
// }
// })

