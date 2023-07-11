const Post = require("../models/post");
const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: async (req, res) => {
    try {
      console.log("Index query...");
      const posts = await Post.find()
        .populate("user")
        .sort({ created_at: -1 })
        .exec();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  SinglePost: async (req, res) => {
    try {
      console.log("Single post query...");
      const post = await Post.findById(req.params.id)
        .populate("user")
        .exec();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ post: post, token: token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  Create: async (req, res) => {
    // if (!req.file) {
    //   return res.status(400).json({ error: "Photo is required." });
    // }
    console.log(req.body.message);
    try {
      const user = await User.findById(req.user_id).exec();
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
      console.log(req.file.filename);
      console.log(typeof(req.file.filename));
       if (req.file.filename) { 
        const post = new Post({
          message: req.body.message,
          photo: req.file.filename,
          user: user._id,
        });
      } else {
        const post = new Post({
          message: req.body.message,
          user: user._id,
        });
      }
      

      await post.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "Post created successfully.", token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = PostsController;
