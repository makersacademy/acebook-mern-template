const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);

      // originally in frontend, but I thought frontend should have minimal code and main purpose is for displaying
      // moved it here as I think this is the backends job?
      // unless we're gna add more sorting features then can move it back in the frontend?
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
};

module.exports = PostsController;
