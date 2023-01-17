// Require the comment model
const Comment = require('../models/comment')
const Post = require("../models/post");
const User = require("../models/user")
const TokenGenerator = require("../models/token_generator");

// Import Mongoose 
const mongoose = require('mongoose')

const CommentsController = {

  // Get all comments (for testing purposes)
  Index: (req, res) => {
    Comment.find().sort({createdAt: -1}).populate('author').exec(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token });
    });
  },

  // Find comment by its ID 
  GetCommentById: (req, res) => {
    // Get the Comment ID from the request parameters 
    const { id } = req.params

    Comment.findById(id).sort({createdAt: -1}).populate('author').exec(async (err, comments) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ comments: comments, token: token });
    });
    
  },
  

  // GetCommentsByPostID

  // Get the Comment (or Post?) ID from the request parameters 
    
  // Searching the posts collection for the array of comment objects 

  // Populating each comment object with the author 

  // Returns an array of comment objects with the message and author 



  // Create a comment on a single post 

  Create: async (req, res) => {
    // Get the Post ID from the request parameters 
    const { id } = req.params

    // Validate that its a valid object ID for a post return error if not
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: "Invalid post ID"})
    }

    // Find the post that matches the ID
    const post = await Post.findById(id)

     // Error if there isnt one 
    if (!post) {
      // return 404
      return res.status(404).json({error: "No posts match this ID"})
    }

     // If successful create a new comment with the body from the params
    const comment = new Comment(req.body);
    comment.save(async (err) => {
      if (err) {
        throw err;
      }
    // Get the user ID propety from the token
    const token = await TokenGenerator.jsonwebtoken(req.user_id)

    res.status(200).json({ message: 'Comment created', token: token});

    // Adds comment to the matching post and saves
    const newPost = await Post.findOne({ _id: id })
    newPost.comments.push(comment)
    const savedPost = await newPost.save()
    console.log(savedPost)
    })
    
  }
}

module.exports = CommentsController;