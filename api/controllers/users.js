const User = require("../models/user");

const TokenGenerator = require("../models/token_generator");

const UsersController = {
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  Index: (req, res) => {
    User.findOne({ _id: req.user_id }).then(async (user) => {
      if (!user) {
        res.status(404).json({ message: "no such user exists in db" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(200).json({ token: token, user: user });
      }
    });
  }
};

module.exports = UsersController;
