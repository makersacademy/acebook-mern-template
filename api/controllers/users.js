const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  Create: async (req, res) => {
    const userEmail = req.body.email;
    const existingUser = await User.findOne({ email: userEmail });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({ message: "Bad request" });
      } else {
        res.status(201).json({ message: "OK" });
      }
    });
  },

  GetOne: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId);
      delete user.password;
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      //console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Find: async (req, res) => {
    try {
      const user = await User.findOne(req.query);
      delete user.password;
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ user: user, token: token });
    } catch (err) {
      //console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  Update: async (req, res) => {
    try {
      const user = await User.findById(req.body.userId);
      const newFollowing = req.body.following
      user.following = newFollowing
      user.save()
    } catch (err) {
      //console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UsersController;
