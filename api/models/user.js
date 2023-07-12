const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: false },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
