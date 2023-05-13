const Comment = require("../models/comment");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {   
    createComment: (req, res) => {
        const comments = new Comment(req.body);
        comments.save(async (err) => {
            if (err) {
              throw err;
            }

            const post = await Post.findById(req.body.postId);
            post.comments.push(comments.comment);
            await post.save();
      
            const token = await TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: "OK", token: token });
        })

    },

    getCommentsByPostId: async (req, res) => {
        const postId = req.params.postId;
        const comments = await Comment.find({ postId });

        console.log(comments);

        res.json(comments);
    }
}

module.exports = CommentsController;
