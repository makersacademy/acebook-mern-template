const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user")
      .sort({ created_at: -1 })
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  SinglePost: (req, res) => {
    Post.findById(req.params.id)
      .populate("user")
      .populate("comments.user")
      .exec(async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ post: post, token: token });
      });
  },
  Create: (req, res) => {
    const post = new Post(req.body);

    User.findById(req.user_id).exec(async (err, user) => {
      post.user = user._id;
      await post.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
