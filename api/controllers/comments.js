// Require the comment model
const Comment = require('../models/comment')
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

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

    // Get the Post ID from the request parameters 

    // Validate that its a valid object ID for a post 
      // Error if not valiid object

    // Find the post that matches the ID

    // Error if there isnt one 

    // get the user ID from the token 

    // If there is a valid object, create an object
      // set post_id file equal to the validated post ID 
      // set user_id field equal to the user_id property of the token

  // Delete a comment 
}