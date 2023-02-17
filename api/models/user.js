const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bio: String,
  profilePicture: { type: String, default: 'https://res.cloudinary.com/did9lgedz/image/upload/v1676564304/ywbm1mao75svek7qsjoy.png' }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
