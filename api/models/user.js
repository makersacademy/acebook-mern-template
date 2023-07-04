const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, reqquired: true },
});

const User = mongoose.model("User", UserSchema);

console.log(email);
module.exports = User;
