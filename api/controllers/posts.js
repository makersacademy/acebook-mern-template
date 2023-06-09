const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    // .find gets data out, .populate adds the referenced user fields
    Post.find().populate({ path: 'user', select: 'name' }).exec((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      // .json() on the backend sends an http response containing a json.
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.user = req.user_id;

    post.save((err) => {
      if (err) {
        throw err;
      }
    
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
