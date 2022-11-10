const TokenGenerator = require('../models/token_generator');
const User = require('../models/user');

const FriendsController = {
  // Form friend connection
  AddFriend: async (req, res) => {
    let user = await User.findById(req.user_id)
    let friendName = req.body.friend.split(' ')

    let potentialFriend = await User.findOne({firstName: friendName[0], lastName: friendName[1]});

    const token = await TokenGenerator.jsonwebtoken(req.user_id);

    if (!potentialFriend) {
      res.status(201).json({ message: 'Friend not found', token: token });
    }

    else if (user.friends.includes(potentialFriend._id)) {
      res.status(201).json({ message: 'They are already friended', token: token });
    }

    else if (potentialFriend._id.toString() === req.user_id.toString()) {
      res.status(201).json({ message: 'You cannot add yourself', token: token });
    }
    
    else {
      user.friends.push(potentialFriend._id);
      user.save();
      res.status(201).json({ message: 'OK', token: token });
    }
  },

  GetFriends: async (req, res) => {
    let user = await User.findById(req.user_id).populate('friends')
    let friends = await user.friends;
    console.log('There are the friends', friends)
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ friends: friends, token: token });
  }
}


module.exports = FriendsController;