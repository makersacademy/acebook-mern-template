const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate('author', 'email')
        .populate('comments');
      console.log(posts)
      const token = TokenGenerator.jsonwebtoken(req.user_id);

      res.status(200).json({ posts: posts, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  Create: (req, res) => {

    const post = new Post(req.body);
    post.author = req.user_id
    console.log(post)
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
