const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");
const Post = require("../models/post")

const CommentController = {
    Index: async (req, res) => {
      try {
        const post_id = req.params.post_id;
        const limit = req.query.limit || 10;
        
        const comments = await Comment.find()
          .limit(Number(limit))
          .populate( 'author',
          )
          .exec();
        console.log('Populated Comments:', comments);
  
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ comments: comments, token: token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
<<<<<<< HEAD
    Create: async (req, res) => {
        try {
          const comment = new Comment(req.body);
          const post = await Post.findById(req.body.post_id);
          
          // Set the author ID in the comment
          comment.author = req.user_id;
      
          comment.created = new Date();

          // Add the new comment to the post
          post.comments.push(comment._id);
          await post.save();
      
          // Save the comment
          await comment.save();
      
          // Populate the author field
          await comment.populate('author', 'firstName').execPopulate();
      
          const token = TokenGenerator.jsonwebtoken(req.user_id);
          res.status(201).json({ message: 'OK', token: token });
        } catch (err) {
          console.error(err);
          res.status(400).json({ message: 'Bad request' });
        }
      },
  };
  
  module.exports = CommentController;
  






























=======
    // Endpoint Comments by Post
};
>>>>>>> main

