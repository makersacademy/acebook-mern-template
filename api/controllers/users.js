const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}
const signupUser = async (req, res) => {
  const {name, email, password, aboutMe} = req.body
  console.log(email)
  try {
    const user = await User.signup(name, email, password, aboutMe)
    res.status(201).json({email})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
    //create token here and add it to response
    console.log(user)
    const token = await TokenGenerator.jsonwebtoken(user.id)
    res.status(200).json({ token: token, user: user, message: "OK" })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const findUser = async (req, res) => {
  try {
    user_id = req.params.id
    const user = await User.findById(user_id)
    res.status(200).json({user: user})
  } catch (error) {
    res.status(404).json({error: 'This user no longer exists'})
  }
}



module.exports = { signupUser, loginUser, findUser }

