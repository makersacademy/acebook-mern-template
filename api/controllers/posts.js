const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate({
        path: "user",
        select: "name image",
      })
      .populate({
        path: "comments.user",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    let postContent = { ...req.body, user: req.user_id };
    const post = new Post(postContent);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  CreateComment: async (req, res) => {
    const postId = req.params.id;
    const comment = { user: req.user_id, message: req.body.message };
    console.log(comment);
    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
      );
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ post, token });
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  Update: (req, res) => {
    const postId = req.params.id;
    Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } }, { new: true }, (err, post) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.status(200).json(post);
      }
    });
  }
};

module.exports = PostsController;
