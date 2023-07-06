const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
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
    console.log("** This is the single post route **");
    console.log(`Post ID from URL params: ${req.params.id}`);
    Post.findById(req.params.id).exec(async (err, post) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ post: post, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.user_id = req.user_id;

    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
