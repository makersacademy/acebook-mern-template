const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");

const CommentController = {
    Index: (req, res) => {
        Comment.find((err, comments) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(200).json({ comments: comments, token: token });
        });
    },
    Create: (req, res) => {
        const comment = new Comment(req.body);
        
        comment.save((err) => {
            if (err) {
                return res.status(400).json({ message: 'Bad request' });
            }

            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: 'OK', token: token });
        });
    },
    // Endpoint Comments by Post
};

module.exports = CommentController;
