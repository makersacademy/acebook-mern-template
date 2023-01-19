const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number },
    avatar: { type: String },
    bio: { type: String },
    hometown: { type: String },
    profession: { type: String },
    relationship_status: { type: String },
    friends: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
