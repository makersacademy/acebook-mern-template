// api/models/user.js
//this file sets up a UserSchema for mongoDB
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
//hash the pw before saving the user
// it's a hook that gets triggered just before a doc is saved
//user entered pw, is being hashed/just hashed version, not stored in DB yet.
UsersSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.models('User', UsersSchema);
module.exports = User;
