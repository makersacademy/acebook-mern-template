const mongoose = require("mongoose");

// modification of user Schema to include a path of chosen avatar
// path public/images/avatars/<filename>
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // avatar is not required because first user inputs only unersname and password
  // then when redirected user chooses avatar and path is updated in database
  // initially avatar will be 0.svg image with empty avatar
  avatar: { type: String, required: false, default: "0.svg" },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
