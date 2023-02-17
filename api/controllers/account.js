const { collection } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
const uploadImage = require('./uploadImage');
const TokenGenerator = require('../models/token_generator');

const AccountController = {
  Index: async (req, res) => {
    let user = await User.findById(req.user_id);
    Post.find({ user_id: req.user_id }, async (err, posts) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(200).json({ posts: posts, user: user, token: token });
      }
    })
      .populate('user_id')
      .populate('comments');
  },

  Update: (req, res) => {
    User.findById(req.user_id, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        let imageUrl = req.file ? await uploadImage(req.file) : user.image;

        user.password = req.body.newPassword || user.password;
        user.email = req.body.newEmail || user.email;
        user.display_name = req.body.newDisplayName || user.display_name;
        user.bio = req.body.newBio || user.bio;
        user.image = imageUrl;
        await user.save();
        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
};

module.exports = AccountController;
