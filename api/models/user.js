const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Expects to receive a valid post ID from Post Schema
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
  friendRequestsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  friendRequestsSent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
  profilePicture: {type: String},
  coverPicture: {type: String}
});

UserSchema.statics.signup = async function (name, email, password, profilePicture, coverPicture) {
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  // validation of user input
  if (!email || !password || !name) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Password not strong enough - must include uppercase, lowercase, numbers, punctuation - min 8 chars"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, email, password: hash, profilePicture, coverPicture});

  return user;
};

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email");
  }
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
const User = mongoose.model("User", UserSchema);

module.exports = User;
