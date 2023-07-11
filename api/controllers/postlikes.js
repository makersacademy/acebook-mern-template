const PostLike = require("../models/postlike");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const PostLikesController = {
  Index: async (req, res) => {
    try {
      const likes = await PostLike.find();
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ likes: likes, token: token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  Create: async (req, res) => {
    const postId = req.body.postId;
    const userId = req.user_id;

    try {
      let like = await PostLike.findOne({ postId: postId });

      if (like) {
        // Like exists, check if user already liked the post
        if (like.likes.includes(userId)) {
          // User liked the post, perform unlike functionality
          like.likes.pull(userId);
        } else {
          // User hasn't liked the post, perform like functionality
          like.likes.push(userId);
        }
      } else {
        // Like doesn't exist, create a new like
        const user = await User.findById(userId);
        const username = user.username;

        like = new PostLike({
          username: username,
          postId: postId,
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

  Delete: async (req, res) => {
    try {
      const postId = req.body.postId;
      const userId = req.user_id;

      const existingLike = await PostLike.findOne({ postId: postId });

      if (existingLike) {
        // Like exists, check if userId already liked the post
        if (existingLike.likes.includes(userId)) {
          // User liked the post, remove userId from likes array
          existingLike.likes.pull(userId);
          await existingLike.save();

          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res
            .status(200)
            .json({ message: "OK", token: token, likes: existingLike });
        } else {
          // User hasn't liked the post
          res.status(400).json({ message: "User hasn't liked the post" });
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

module.exports = PostLikesController;
