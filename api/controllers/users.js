const User = require("../models/user");
const generateToken = require("../models/token_generator");

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user.id);
    res.status(201).json({ token, message: "OK" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userId }, "username name");
    const token = generateToken(req.userId);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

module.exports = { createUser, getUser };
