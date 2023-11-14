const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    console.log("controllers/posts.js 15: getting user id:")
    console.log(req.user_id);

    const post = new Post({
      message: req.body.message, // necessary change from req.body to make this work.
      user_id: req.user_id}); // adds the user_id from req to the new Post

    console.log("controllers/posts.js 20: getting post object:")
    console.log(post);

    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
