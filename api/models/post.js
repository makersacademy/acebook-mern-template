const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const PostSchema = new mongoose.Schema(
  {
    message: String,
    userName: String,
    comments: [{ userName: String, timeStamp: Date, message: String }],
    imageURL: String,
    profilePicture: { type: String, default: 'https://res.cloudinary.com/did9lgedz/image/upload/v1676564304/ywbm1mao75svek7qsjoy.png' },
    likes: [{}]        
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
