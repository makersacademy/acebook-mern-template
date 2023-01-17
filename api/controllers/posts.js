const Post = require("../models/post");
const Comment = require("../models/comment")
const TokenGenerator = require("../models/token_generator");
const mongoose = require('mongoose')

const PostsController = {
  Index: (req, res) => {
    // Populate method is called twice - to populate author field, then comment field
    Post.find().sort({createdAt: -1}).populate('author').populate('comments').exec(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  GetPostById: (req, res ) => {
    // get id from req params
    const { id } = req.params
    
    // Make sure the ID given is a valid type of mongoose object ID 
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "Invalid post id"})
    }
    
    Post.findOne({ _id: id }).sort({createdAt: -1}).populate('author').populate('comments').exec(async (err, post) => {
      // If valid object ID but it doenst exist in database
      if (!post) {
        return res.status(404).json({error: "No such post exists"})
      } else if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ post: post, token: token });
    });
  }
};

module.exports = PostsController;
