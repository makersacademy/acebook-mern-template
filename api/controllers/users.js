const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ message: "OK" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
};

module.exports = { createUser };
