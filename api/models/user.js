const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const validator = require('validator')


const UserSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  aboutMe: {type: String},
  friends: { type: Array }
});


UserSchema.statics.signup = async function(name, email, password, aboutMe) {

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
  const user = await this.create({ name, aboutMe, email, password: hash })
  console.log(user)
  return user
}


UserSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }
  console.log(user)
  return user
}


const User = mongoose.model("User", UserSchema);

module.exports = User;
