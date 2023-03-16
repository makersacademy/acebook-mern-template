const User = require("../models/user");
const generateToken = require("../models/token_generator");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean();

  if (!user) {
    res.status(401).json({ message: "No account with this email" });
  } else if (user.password !== password) {
    res.status(401).json({ message: "Incorrect password" });
  } else {
    const token = generateToken(user._id);

    delete user.password;
    delete user._id;
    delete user.__v;

    res.status(201).json({ token, user });
  }
};

module.exports = { login };
