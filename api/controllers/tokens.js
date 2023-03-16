const bcrypt = require("bcryptjs");
const User = require("../models/user");
const generateToken = require("../models/token_generator");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.status(401).json({ message: "No account with this email" });
  }

  const passwordIsMatch = bcrypt.compareSync(password, user.password);

  if (!passwordIsMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }
  const token = generateToken(user._id);

  delete user.password;
  delete user._id;
  delete user.__v;

  return res.status(201).json({ token, user, message: "Login Successful" });
};

module.exports = { login };
