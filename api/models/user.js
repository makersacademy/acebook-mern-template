const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    default: 'unknown'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: '/default_avatar.png'
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
