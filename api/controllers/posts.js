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
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  PostsByUser: (req, res) => {
    const authorId = req.params["authorId"]
    Post.find({author: authorId}).then(
      (posts) => {
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ posts: posts, token: token});
      }
    )
    .catch(err => {throw err});
  },
   //Todo: Posts By followers endpoint: 
};

module.exports = PostsController;
