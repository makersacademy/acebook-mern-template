const Comment = require("../models/comment");
const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");
const jwt = require("jsonwebtoken");

const CommentsController = {
  Index: (req, res) => {
    try {
      // Added validation if the request hasn't got the "Authorization" header
      // you are not able to get comments
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized. Missing token.' });
      }

      Comment.find((err, comments) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ comments: comments, token: token });
      });
    } catch (err) {
      // Handle any unexpected error
      return res.status(500).json({ error: 'Unexpected error occurred.' });
    }
  },
  Create: (req, res) => {
    try {
      // Added validation if the request hasn't got the "Authorization" header
      // you are not able to make a comment
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized. Missing token.' });
      }
      const comment = new Comment({
        comment: req.body.comment,
        user: req.body.user,
      });
      
      const postId = req.body.post
      console.log("req.body.post", req.body.post)
      Post.findById(postId, (err, post) => {
        if (err) {
          throw err;
        }
        comment.save((err) => {
          if (err) {
            // Handle the error and send an appropriate response
            return res.status(500).json({ error: 'Failed to save comment.' });
          }
          console.log("Comment",comment);
          console.log("post comment", post);
          post.comments.push(comment)
          const token = TokenGenerator.jsonwebtoken(req.user_id);
          res.status(201).json({ comment: 'OK', token: token });
      }); 
      
      });

      
    } catch (err) {
      // Handle any unexpected error
      return res.status(500).json({ error: 'Unexpected error occurred.' });
    }
  },
  Delete: async (req, res) => {
    try {
      // Added validation if the request hasn't got the "Authorization" header
      // you are not able to make a comment
      if (!req.headers.authorization) {
        return res.status(401).json({ error: 'Unauthorized. Missing token.' });
      }
      // checking if comment exists
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found.'});
      }
      // To compare id's of users, we need to get access to the id of
      // of the user who's logged in. This parameter is unavailable 
      // in the req so we need to extract it from Authorization token.
      const token = req.headers.authorization.split(' ')[1];
      // Verify the token to get the payload, including the user_id
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      // user_id - who wants to delete comment
      const user_id = decodedToken.user_id;
      // Retrieve the post associated with the comment
      const post = await Post.findById(comment.post);
      // console.log("comment.post", comment.post)
      // console.log("user_id", user_id);
      // console.log("comment.user.toString()",comment.user.toString())
      // console.log("post", post);
      if (comment.user.toString() !== user_id && post.user.toString() !== user_id) {
        return res.status(403).json({ error: 'Forbidden. You are not allowed to delete this comment.' });
      }
      //delete the comment
      const deleteResult = await Comment.deleteOne({ _id: req.params.id });
      if (deleteResult.deletedCount === 1) {
      //return success response
      const newToken = TokenGenerator.jsonwebtoken(user_id);
      res
        .status(200)
        .json({ message: 'Comment deleted succesfully.', token: newToken });
    }
    }
    catch (err) {
      return res.status(500).json({ error: 'Unexpected error occured.' });
    }
  },
};

module.exports = CommentsController;
