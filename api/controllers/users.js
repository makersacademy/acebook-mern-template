const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");
const Post = require("../models/post");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'});
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  // This function returns a *displayName*, not a user object,
  // so I've renamed it
  // - Perran
  FindSingleDisplayNameById: (req, res) => {
    const userId = req.user_id; 
    User.findById(userId).select('displayName').exec((err, user) => {
      if (err) {
        // Handle error
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (!user) {
        // Handle case where user is not found
        res.status(404).json({ error: 'User not found' });
      } else {
        // User found, send back the displayName
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ displayName: user.displayName });
      }
    });
  },

  IndexById: (req, res) => {
    const userId = req.params.userId;
    User.findById(userId).exec((err, user) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ message: "OK", user: user, token: token })
      }
    });
  }
};
module.exports = UsersController;
