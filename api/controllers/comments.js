const Comment = require("../models/comment");
const TokenGenerator = require("../lib/token_generator");
const Post = require("../models/post")

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
    Create: async (req, res) => {
        const comment = new Comment(req.body);
        // find the post using postId
        const post = await Post.findById(req.body.post_id)
        // add the new comment to the post
        // save the post
        comment.author = req.user_id
        post.comments.push(comment._id)
        await post.save()
        comment.save((err) => {
            if (err) {
                return res.status(400).json({ message: 'Bad request' });
            }

            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: 'OK', token: token });
        });
    },
};

module.exports = CommentController;
