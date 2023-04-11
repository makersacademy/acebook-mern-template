  const mongoose = require("mongoose");

  const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default:'http://cdn.onlinewebfonts.com/svg/img_561543.png' },
  });

  const User = mongoose.model("User", UserSchema);

  module.exports = User;
