const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const LikesController = {
  Create: async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
      {
        post.likes.push(req.user_id);

        await post.save();

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    });
  },
};

module.exports = LikesController;
