const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, default: "" },
  bio: { type: String, default: "" },
  followers: { type: Number, default: 0 },
  image: {
    data: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
