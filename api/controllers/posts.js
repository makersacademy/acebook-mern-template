const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  // Create needs to be updated to include pulling the user_id from authenticated user
  Create: (req, res) => {
    const user_id = req.user_id;
    const post = new Post({
      ...req.body,
      // added a line to add and update user_id field
      user_id: user_id,
      });
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  // method to get posts filtered by user_id
  FindPostsByUserId: async (req, res) => {
    const user_id = req.params.user_id

    // finding posts with specific user_id
    const result = await Post.find({user_id: user_id});
    const token = TokenGenerator.jsonwebtoken(req.user_id)

    if (!result) {
      return res.status(400).json({ message: "No posts found" });
    }
    else {
      res.status(200).json({ posts: result, token: token });
    }
  }
  };


module.exports = PostsController;
