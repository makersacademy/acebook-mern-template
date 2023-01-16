const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    avatar: { type: String, required: false },
    bio: { type: String, required: true },
    hometown: { type: String, required: true },
    profession: { type: String, required: false },
    relationship_status: { type: String, require: false },
    friends: { type: Array, default: [], require: false },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
