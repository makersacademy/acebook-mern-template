const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: false}, //// Defines the 'username' field as a string. username is not a string, Mongoose will throw error
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
