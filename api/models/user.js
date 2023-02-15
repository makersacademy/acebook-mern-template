const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  display_name: { type: String, required: false, default: 'Anonymous User' },
  bio: { type: String, required: false },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
