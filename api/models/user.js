const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  name: { type: String, required: true, default: "Name" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, required: true, default: "/sample_avatar.png"}
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
