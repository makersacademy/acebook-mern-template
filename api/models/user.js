const mongoose = require("mongoose");

// const defaultImage = 'default_image.jpg';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  // picture: { type: String, default: defaultImage },
  // friends: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  // posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }],
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;