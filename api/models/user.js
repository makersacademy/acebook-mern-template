const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validator for email format.
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9]{4,25}$/.test(v); // ONLY ALPHANUMERIC, at least 4 characters, max 25 characters.
      },
    },
  },
  usersName: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[a-z ,.'-]*$/i.test(v); // No special characters, empty string allowed
      },
      message: 'Are you trying to include some weird characters?',
    },
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
