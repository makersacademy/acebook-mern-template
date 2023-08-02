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
  Update: (req, res) => {
    const postId = req.params.id;
    const updatedMessage = req.body.message;
    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (!post) {
        return res.status(404).json({ message: "post not found!" });
      }
      post.message = updatedMessage;
      post.save((err) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res
          .status(200)
          .json({ message: "Post updated successfully", token: token });
      });
    });
  },
  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      user: req.user_id,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
