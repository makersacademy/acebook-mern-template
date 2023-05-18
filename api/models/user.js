const mongoose = require("mongoose");
const Post = require("./post");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { strict: false } // allows for partial updates
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
