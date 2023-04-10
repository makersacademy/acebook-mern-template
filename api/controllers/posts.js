const Post = require("../models/post");
const Users = require("../models/user");
const Image = require('../models/image')
const TokenGenerator = require("../models/token_generator");
const { ObjectId } = require("mongodb");


const PostsController = {
  Index: async (req, res) => {
    const user = await Users.findById(req.user_id)
    Post.find(async (err, posts) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, user: user, token: token });
    }).sort({ createdAt: -1 });
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

  Upload: async (req, res) => {
    if (!req.file) return
    const user = await Users.findById(req.user_id)
    const image = new Image({
      image: {
        fileName: req.file.filename,
        contentType: req.file.mimetype,
      },
      ownerId: user
    });
  
    image.save(async (err) => {
      if (err) { throw err }
  
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });//.send(image);
    })
  },

  GetPostOwnerData: (req, res) => {
    Users.findById(req.params.ownerId, async (err, data) => {
      if (err) { throw err }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ownerData: data, token: token });
    })
  }
};

module.exports = PostsController;
