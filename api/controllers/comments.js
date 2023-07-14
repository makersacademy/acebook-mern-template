const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const CommentsController = {
  Create: async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
      {
        const newComment = {
          user: req.user_id,
          comment: req.body.comment,
        };

        post.comments.push(newComment);

        await post.save();

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    });
  },
};

module.exports = CommentsController;
