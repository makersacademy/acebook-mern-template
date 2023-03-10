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
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    //injecting user_id here
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
};

module.exports = PostsController;
