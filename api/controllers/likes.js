const Likes = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  // Retrieves a list of all posts
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      // checks if the user is logged in and matches the user_id
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts.reverse(), token: token });
    });
  },
  // It creates a post and saves it to the database
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err, post) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token, post: post });
    });
  },
};

module.exports = PostsController;
