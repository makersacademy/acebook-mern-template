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
  Create: (req, res) => {
    const post = new Post(req.body);

    User.findById(req.user_id).exec(async (err, user) => {
      console.log(user);
      post.user = user._id;
      await post.save();

      console.log(post);

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
