const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    console.log("Index query...");
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
    console.log("Single post query...");
    Post.findById(req.params.id)
      .populate("user")
      .exec(async (err, post) => {
        if (err) {
          throw err;
        }
        console.log(post);
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ post: post, token: token });
      });
  },
  Create: async (req, res, next) => {
    try {
      const post = new Post({
        user: req.user_id,
        message: req.body.message,
        photo: req.file ? req.file.filename : undefined,
      });

      await post.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = PostsController;
