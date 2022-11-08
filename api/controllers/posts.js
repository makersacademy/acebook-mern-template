const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  Index: (req, res) => {
    Post.find().populate('author').find(async (err, posts) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token, author: req.user_id });
    });
  },
  Create: (req, res) => {
    const newPost = {
      message: req.body.message,
      author: req.user_id
    };

    const post = new Post(newPost);


    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });

  }
}

module.exports = PostsController;
