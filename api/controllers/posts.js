const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      const reversedPosts = posts.reverse();
      console.log('posts logged here', reversedPosts);
      // res.status(200).json({ posts: posts, token: token });
      res.status(200).json({ posts: reversedPosts, token: token });
    });
  },
  Create: (req, res) => {
    // console.log("req: ", req.body);
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
