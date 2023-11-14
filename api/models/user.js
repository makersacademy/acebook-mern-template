const mongoose = require("mongoose");

// modification of user Schema to include a path of chosen avatar
// path public/images/avatars/<filename>
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
