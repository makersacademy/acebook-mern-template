const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

  const CommentController = {

    // Create a new comment
    CreateComment: async (req, res) => {
        const newComment = new Comment({req.body});
        const savedComment = await newComment.save();
        if (err) {
            throw err;
        } else {
            res.status(201).json({ message: 'Like added' });
        }}}
        

        // // Get all comments for a specific post
        // getCommentsByPost = async (req, res) => {
        // const postId = req.params.postId;

        // try {
        //     const comments = await Comment.find({ post: postId }).populate('poster', 'username').exec();

        //     res.json(comments);
        // } catch (err) {
        //     res.status(500).json({ error: err.message });
        // }
        // };


module.exports = CommentController;
