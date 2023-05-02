const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  imageURL: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
