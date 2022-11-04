const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  timestamp: Date,
  // image: Buffer,
  message: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9~!@#()`;\-':,.?| ]*$/.test(v);
      },
    },
    required: [true, "You can't submit an empty message, you idiot!"],
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
