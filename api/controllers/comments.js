const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {

  


    Create: (req, res) => {
        const commentData = {message: req.body.message, user: req.user_id, post: req.post_id, token: req.body.token};
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