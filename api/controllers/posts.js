const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");
const { post } = require("superagent");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Update: (req, res) => {
    const postId = req.params.id;

    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
      if (!post) {
        return res.status(404).json({ message: "post not found!" });
      }

      const updatedMessage = req.body.message;
      const userID = post.user;
      
      if (userID == req.user_id) {
        post.message = updatedMessage;
        
      } else {
        return res.status(401).json({ message: "auth error" });
      }

      post.save((err) => {
        if (err) {
          res.status(500).json({ message: "error" });
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res
          .status(200)
          .json({ message: "Post updated successfully", token: token });
      });
    });
  },
  Create: (req, res) => {
    const post = new Post({
      message: req.body.message,
      user: req.user_id,
    });
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  Like: async (req, res) => {
    const postId = req.body.post_id;
    const userId = req.user_id;

    const post = await Post.findById(postId);
    if (post.likes.includes(userId)){
      return res.status(401).json({ message: "Already Likes" });
    }
    else{
    post.likes.push(userId);
    }
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      
      const token = await TokenGenerator.jsonwebtoken(userId)
      res.status(201).json({ message: 'OK', token: token });
    })
  },
};

module.exports = PostsController;
