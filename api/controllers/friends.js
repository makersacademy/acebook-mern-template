const TokenGenerator = require('../models/token_generator');
const User = require('../models/user');

const FriendsController = {
  // Form friend connection
  AddFriend: async (req, res) => {
    let user = await User.findById(req.user_id)
    user.friends.push(req.body.friend);
    user.save();
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(201).json({ message: 'OK', token: token });
  }
}

module.exports = FriendsController;

// TODO: Add an index method that returns a users friendslist.