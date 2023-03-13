const User = require("../models/user");
const generateToken = require("../models/token_generator");

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "OK" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.userId }, "username");
    const token = await generateToken(req.userId);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

module.exports = { createUser, getUser };
