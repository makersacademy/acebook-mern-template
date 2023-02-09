const { collection } = require("../models/post");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

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
};

module.exports = AccountController;
