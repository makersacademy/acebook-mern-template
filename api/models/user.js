const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  profilePic: String,

  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validator for email format.
      },
      message: "Email format is invalid",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]{4,25}$/.test(v); // ONLY ALPHANUMERIC, at least 4 characters, max 25 characters.
      },
      message: "password format is invalid",
    },
  },
  usersName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-z ,.'-]*$/i.test(v); // No special characters, empty string allowed
      },
      message: "User's name format is invalid",
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
