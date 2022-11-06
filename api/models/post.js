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
      message: 'Format is incorrect',
    },
    required: [true],
  },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
