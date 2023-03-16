const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imageId: { type: String },
});

const User = mongoose.model("User", UserSchema);

User.createIndexes({ username: 1, email: 1 });

module.exports = User;
