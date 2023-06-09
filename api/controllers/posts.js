const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const tokenDecoder = require("../models/token_decode");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: async (req, res) => {
    const post = new Post({message: req.body.message, author: tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id});

    try {
      await post.save();

      await post.populate('author').execPopulate();

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      return res.status(201).json({ message: 'OK', token: token });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while saving the post' });
    }
  }
};


// , author: tokenDecoder(req.token).user_id
module.exports = PostsController;
