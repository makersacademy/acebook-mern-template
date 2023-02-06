/**
 * create an instance of mongoose
 */
const mongoose = require('mongoose');

/**
 * create a schema for User
 * it contains a list of the fields for the data
 */
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

/**
 * create an instance of the user schema
 * this can then be shared across the app
 */
const User = mongoose.model('User', UserSchema);

module.exports = User;
