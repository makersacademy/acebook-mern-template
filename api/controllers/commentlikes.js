const CommentLike = require("../models/commentlike");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const CommentLikesController = {
  Index: async (req, res) => {
    try {
      const likes = await CommentLike.find();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ likes: likes, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  FindCommentLike: async (req, res) => {
    try {
      const likes = await CommentLike.findById(req.commentId);
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ likes: likes, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  Like: async (req, res) => {
    const commentId = req.body.commentId;
    const userId = req.user_id;

    try {
      let like = await CommentLike.findOne({ commentId: commentId });

      if (like) {
        // Like exists, check if user already liked the comment
        if (like.likes.includes(userId)) {
          // User liked the comment, perform unlike functionality
          like.likes.pull(userId);
        } else {
          // User hasn't liked the comment, perform like functionality
          like.likes.push(userId);
        }
      } else {
        // Like doesn't exist, create a new like
        const user = await User.findById(userId);
        const username = user.username;

        like = new CommentLike({
          username: username,
          commentId: commentId,
          likes: [userId], // Initialize the likes array with the user ID
        });
      }

      await like.save();

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, likes: like });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  Unlike: async (req, res) => {
    try {
      const commentId = req.body.commentId;
      const userId = req.user_id;

      const existingLike = await CommentLike.findOne({ commentId: commentId });

      if (existingLike) {
        // Like exists, check if userId already liked the comment
        if (existingLike.likes.includes(userId)) {
          // User liked the comment, remove userId from likes array
          existingLike.likes.pull(userId);
          await existingLike.save();

          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res
            .status(200)
            .json({ message: "OK", token: token, likes: existingLike });
        } else {
          // User hasn't liked the comment
          res.status(400).json({ message: "User hasn't liked the comment" });
        }
      } else {
        // Like doesn't exist
        res.status(404).json({ message: "Like not found" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = CommentLikesController;
