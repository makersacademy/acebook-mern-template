const Comment = require("../models/comment");

const CommentsController = {   
    createComment: async (req, res) => {
        const { postId, text } = req.body;
        const comment = new Comment({ postId, text });
        await comment.save();

        res.status(201).json({ message: "Comment created successfully" });
    },

    getCommentsByPostId: async (req, res) => {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });

        res.json(comments);
    }
}

module.exports = CommentsController;
