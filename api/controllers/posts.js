const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const { post } = require("../routes/posts");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    console.log("Post Content: " + post);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  Delete: (req, res) => {
    const postId = req.params.id;
    Post.deleteOne({ _id: postId }, async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res
        .status(200)
        .json({ message: "Post deleted successfully", token: token });
    });
  },
};

module.exports = PostsController;
