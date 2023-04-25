const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  profilePic: {
    type: String,
    default: "https://res.cloudinary.com/dhocnl7tm/image/upload/v1682355179/hugk4xv9xqei28pwy4ay.png"
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  username: {
    type: String,
    default: "Acebook User"
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
