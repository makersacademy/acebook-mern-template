const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
    Index: (req, res) => {
        const populatedComments = Comment.find().populate('user');
        populatedComments.find( async (err, comments) => {
            if (err) {
                throw err;
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id) // user_id may not be needed here and below
            res.status(200).json({ message: comments, token: token, user: req.user_id });
        })
    },

    Create: (req, res) => {
        console.log(req);
          const commentData = { 
          message: req.body.message, 
          user: req.user_id, 
          token: req.body.token,
          post: req.body.post
        };
          
        const comment = new Comment(commentData);
        comment.save(async (err) => {
            if(err) {
                throw err;
            }
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(201).json({comment: comment, token: token});
        });
    },
};

module.exports = CommentsController;