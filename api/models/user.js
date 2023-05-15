const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  userName: { type: String, required: true},
  photo: { type: String } // added photo - is this all that is needed?
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
