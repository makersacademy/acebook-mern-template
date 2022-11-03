const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    const populatedPosts = Post.find().populate('user');
    populatedPosts.find().sort('-date').find(async (err, posts) => {
      if (err) {
        throw err;
      }
     
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token, user: req.user_id });
    });
  },
  Create: (req, res) => {
    const postData = {message: req.body.message, user: req.user_id, token: req.body.token};
    console.log(postData);
    const post = new Post(postData);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ post: post, token: token});
    });
  },
};

module.exports = PostsController;
