const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      posts.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated));
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
  UpdateLikeCount: (req, res) => {
    const postId = req.params.postId
    Post.findByIdAndUpdate(
      postId,
      { $inc: { likeCount: 1} },
      { new: true },
      (err, post) => {
        if(err) {
          throw err;
        }
        res.status(200).json({ message: "OK", post: post})
      }
    )
  }
};

module.exports = PostsController;
