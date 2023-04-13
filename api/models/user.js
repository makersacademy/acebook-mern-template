const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: { type: String, required: true },
  password: { type: String, required: true },
  profilePicture: { 
    type: String, 
    default: 'default.jpg'
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
