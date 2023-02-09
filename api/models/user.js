const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  friendsList: [{type: Number}]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
