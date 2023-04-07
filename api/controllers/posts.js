const Post = require("../models/post");
const Users = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");


const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    })
      .sort({ createdAt: -1 });
  },
  
  Create: async (req, res) => {
    const post = new Post(req.body);
    const user = await Users.findById(req.user_id)
    post.createdBy = user

    post.save(async (err) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
