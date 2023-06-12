const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });//posts are contained here with the token
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  Delete: async (req, res) => {
    try {
      const { post_id } = req.params;
      await Post.deleteOne({ _id: post_id });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Post deleted', token: token });
    } catch (err) {
      res.status(400).json({ message: 'Bad request' });
    }
  }
};

module.exports = PostsController;
