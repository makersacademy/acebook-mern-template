const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

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

  Delete: (req, res) => {
    Post.deleteOne({ _id: req.params.id }, async (err) => {
      if (err) {
        throw err;
      } else {

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    });
  },

  Update: (req, res) => {
    Post.updateOne({_id: req.body._id, title: req.body.title, content: req.body.content }, async (err) => {
      if (err) {
        throw err;
      } else {

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    });
  }
};

module.exports = PostsController;
