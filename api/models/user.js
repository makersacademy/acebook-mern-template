const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: Buffer, required: false, default: null },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
