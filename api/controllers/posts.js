const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .sort({ createdAt: -1 })
      .populate("author")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  Like: (req, res) => {
    const postId = req.params.id;
    const userId = req.body.user_id;

    Post.findOneAndUpdate(
      { _id: postId, likes: { $nin: [userId] } },
      { $addToSet: { likes: userId }, $inc: { likeCount: 1 } },
      { new: true }
    )
      .populate("author")
      .populate("likes")
      .exec(async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token, post: post });
      });
  },
  Unlike: (req, res) => {
    const postId = req.params.id;
    const userId = req.user_id;

    Post.findOneAndUpdate(
      { _id: postId, likes: { $in: [userId] } },
      { $pull: { likes: userId }, $inc: { likeCount: -1 } },
      { new: true }
    )
      .populate("author")
      .populate("likes")
      .exec(async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK!", token: token, post: post });
      });
  },
};

module.exports = PostsController;
