const Like = require("../models/like");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const LikesController = {
  Index: (req, res) => {
    Like.find(async (err, likes) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ likes: likes, token: token });
    });
  },
  Create: (req, res) => {
    const userId = req.user_id;
    const postId = req.postId;
    console.log(postId);

    // Check if the user has already liked the post
    Like.findOne({ username: userId, postId: postId }, (err, existingLike) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (existingLike) {
        // User has already liked the post
        return res
          .status(400)
          .json({ message: "User has already liked the post" });
      }

      // User has not liked the post, proceed to create the new like
      User.findById(userId)
        .then((user) => user.username)
        .then((username) => {
          const like = new Like({
            username: username,
            postId: postId,
            likes: req.body.likes,
          });
          like.save(async (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            const token = await TokenGenerator.jsonwebtoken(userId);
            res.status(201).json({ message: "OK", token: token, likes: like });
          });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ message: "Internal Server Error" });
        });
    });
  },
};

module.exports = LikesController;
