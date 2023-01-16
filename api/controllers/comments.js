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

  // const getPrescription = async (req, res) => {
  //   // get the prescription Id
  //   const { id } = req.params
  
  //   // Make sure the ID given is a valid type of mongoose object ID 
  //   if(!mongoose.Types.ObjectId.isValid(id)){
  //     return res.status(404).json({error: "No such prescription"})
  //   }
  
  //   const prescription = await Prescription.findById(id)
  
  //   // if the workout doesnt exist:
  //   if (!prescription) {
  //     return res.status(404).json({error: "No such prescription"})
  //   }
  
  //   res.status(200).json(prescription)
  // }

  Create: (req, res) => {

  }
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

module.exports = CommentsController;