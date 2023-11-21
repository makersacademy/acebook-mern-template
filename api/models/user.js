const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  likedPostIds: {type: [String], default: []},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
