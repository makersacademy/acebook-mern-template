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
            const comments = await Comment.find({ post: postId }).populate('poster', 'firstName');
            console.log(comments)
            res.status(200).json({ comments: comments });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    
    };

module.exports = CommentController;
