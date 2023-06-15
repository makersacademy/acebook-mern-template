const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UserConnections = {
  AddFriend: (req, res) => {
    User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { friends: req.body.friendId } }, { new: true }).then(user => {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ token: token });
    });
  },

  GetFriends: (req, res) => {
    User.findOne({ _id: req.body.userId }).then(async (user) => {
      res.status(201).json({ friends: user.friends });
    });
  },
};

module.exports = UserConnections;
