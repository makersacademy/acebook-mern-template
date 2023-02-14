const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true},
  password: { type: String, required: true},
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date }
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
