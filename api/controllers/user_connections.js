const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const UserConnections = {
  AddFriend: (req, res) => {
    User.findOneAndUpdate({ _id: req.body.userId }, { $addToSet: { friends: req.body.friendId } }, { new: true }).then(user => {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ token: token });
    });
  }
}

module.exports = UserConnections;