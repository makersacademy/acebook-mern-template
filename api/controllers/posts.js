const Post = require("../models/post");
const Comment = require("../models/comment")
const TokenGenerator = require("../models/token_generator");
const mongoose = require('mongoose');
const { db } = require("../models/post");

const PostsController = {
  Index: (req, res) => {
    // Populate method is called twice - to populate author field, then comment field
    Post.find().sort({createdAt: -1}).populate('author').populate({
      path : 'comments',
      populate : {
        path : 'author'
      }}).exec(async (err, posts) => {
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

  Delete: async (req, res) => {
    const id = req.params.id
    const post = Post.findById({_id: id})
  
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "Invalid post id"})
    }

    const deletedCommentInfo = await Comment.deleteMany({ post_id: id })
    if (deletedCommentInfo.ok === 1) {
      await Post.findByIdAndDelete({_id: id})
      res.status(204).json({message: "Post deleted"})  
    } else { 
      return res.status(500).json({message: "Could not delete associated comments"})
    }
  },

  GetPostById: (req, res ) => {
    // get id from req params
    const { id } = req.params
    
    // Make sure the ID given is a valid type of mongoose object ID 
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "Invalid post id"})
    }
    
    Post.findOne({ _id: id }).sort({createdAt: -1}).populate('author').populate({
      path : 'comments',
      populate : {
        path : 'author'
      }
    }).exec(async (err, post) => {
      // If valid object ID but it doenst exist in database
      if (!post) {
        return res.status(404).json({error: "No such post exists"})
      } else if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ post: post, token: token });
    });
  },

  Like: (req, res) => {
    const postId = req.params.id;
    const userId = req.user_id;

    Post.findOneAndUpdate(
      { _id: postId, likes: { $nin: [userId] } },
      { $addToSet: { likes: userId }, $inc: { likeCount: 1 } },
      { new: true }
    ).exec(async (err, post) => {
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
    ).exec(async (err, post) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK!", token: token, post: post });
    });
  },

  GetLikers: (req, res) => {
    const postId = req.params.id;

    Post.findOne({ _id: postId })
      .populate("likes")
      .exec((err, post) => {
        if (err) {
          throw err;
        }
        if (!post) {
          return res.status(404).json({ message: "Post not found." });
        }
        const likers = post.likes;
        res.status(200).json({ likers });
      });
  },
};
module.exports = PostsController;
