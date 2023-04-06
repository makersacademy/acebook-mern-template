const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
    .populate("user", "name")
    .exec(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    let postContent = { ...req.body, user: req.user_id, likes: req.likes_id };
    const post = new Post(postContent);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
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
