const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  profilePic: { type: String, default: '/sauron.jpg' },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
