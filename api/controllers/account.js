const { collection } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');
const TokenGenerator = require('../models/token_generator');

const AccountController = {
  Index: (req, res) => {
    Post.find({ user_id: req.user_id }, async (err, posts) => {
      if (err) {
        // res.status(401).json({ message: "Bad request" });
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(200).json({ posts: posts, token: token });
        // res.status(200).json({ message: "ok" });
      }
    });
  },

  Update: (req, res) => {
    User.findById(req.user_id, async (err, user) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        user.password = req.body.newPassword || user.password;
        user.email = req.body.newEmail || user.email;
        user.display_name = req.body.newDisplayName || user.display_name;
        user.bio = req.body.newBio || user.bio;
        user.image = req.body.newImage || user.image;
        await user.save();
        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },
};

module.exports = AccountController;
