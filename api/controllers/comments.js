// Require the comment model
const Comment = require('../models/comment')
const Post = require("../models/post");
const User = require("../models/user")
const TokenGenerator = require("../models/token_generator");

// Import Mongoose 
const mongoose = require('mongoose')

const CommentsController = {

  // Find all comments that are on a single post 

  getCommentsById: (req, res) => {
    // Get the post ID 

    // Searching the posts collection for the array of comment objects 

    // Populating each comment object with the author 

    // Returns an array of comment objects with the message and author 

    // Post.find().sort({createdAt: -1}).populate('author').exec(async (err, posts) => {
    //   if (err) {
    //     throw err;
    //   }
    //   const token = await TokenGenerator.jsonwebtoken(req.user_id)
    //   res.status(200).json({ posts: posts, token: token });
    // });
  },

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
    })
    
  }
}

module.exports = CommentsController;