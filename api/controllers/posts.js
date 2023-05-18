const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const JWT = require("jsonwebtoken");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("authorUserID")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },

  Create: (req, res) => {
    if (!req.user_id) {
      return res.status(401).json({ message: "Auth error" });
    }
    const post = new Post({ ...req.body, authorUserID: req.user_id });
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  AddLikes: (req, res) => {
    Post.findById(req.body.id, (err, post) => {
      if (err) {
        throw err;
      }
      post.likes.push(req.body.username);

      post.save(async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", post: post, token: token });
      });
    });
  },

  Update: async (req, res) => {
    try {
      const post_id = req.params.id;
      console.log(post_id)
      const update = req.body;
      const updatedPost = await Post.findOneAndUpdate({ _id: post_id }, update, { new: true });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.json({token})
      // res.json({mssg: "You have updated this post!", token: token, updatedPost: updatedPost})
    } catch (err) {
      res.status(500).json({error: "messed up again!"})
    }
  },
};

module.exports = PostsController;
