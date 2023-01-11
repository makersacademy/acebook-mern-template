const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')


const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
});


UserSchema.statics.signup = async function(email, password) {

  // validation
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}


const User = mongoose.model("User", UserSchema);

module.exports = User;
