const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const signupUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.signup(email, password)
    res.status(201).json({email})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = signupUser;


