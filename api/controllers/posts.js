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
  PostsByUser: (req, res) => {
    let userID;
    if (req.params.id === "me") {
      userID = req.user_id;
    } else {
      userID = req.params.id;
    }
    Post.find({ user: userID })
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
  Create: async (req, res, next) => {
    try {
      const post = new Post({
        user: req.user_id,
        message: req.body.message,
        photo: req.file ? req.file.filename : undefined,
      });

      User.findById(req.user_id).exec(async (err, user) => {
        post.user = user._id;

        await post.save();

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = PostsController;
