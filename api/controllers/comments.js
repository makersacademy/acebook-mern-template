const Comment = require("../models/comments");
const TokenGenerator = require("../models/token_generator");

  const CommentController = {

    // Create a new comment
    CreateComment: (req, res) => {
        const comment = new Comment(
          {
            comment: req.body.comment,
            post: req.body.post,
            poster: req.body.poster
          }
        );
        comment.save(async (err) => {
          if (err) {
            console.log(err)
            throw err;
          }

          console.log("PASSED")
          const token = await TokenGenerator.jsonwebtoken(req.user_id)
          res.status(201).json({ message: 'OK', token: token });
        });
      },

    GetCommentByPost: async (req, res) => {
        const postId = req.params.post_id;
        try {
            const comments = await Comment.find({ post: postId })
            // .populate('poster', 'firstName');
            res.status(200).json({ comments: comments, message: "comments retrieved" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    };

module.exports = CommentController;
