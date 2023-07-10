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
    const postId = req.body.postId;
    const userId = req.user_id;

    Like.findOne({ postId: postId }, async (err, existingLike) => {
      if (err) {
        throw err;
      }

      if (existingLike) {
        // Like exists, proceed with unlike functionality
        Like.findOneAndUpdate(
          { postId: postId },
          { $pull: { likes: userId } },
          { new: true },
          async (err, updatedLike) => {
            if (err) {
              throw err;
            }

            const token = await TokenGenerator.jsonwebtoken(req.user_id);
            res
              .status(201)
              .json({ message: "OK", token: token, likes: updatedLike });
          }
        );
      } else {
        // Like doesn't exist, create a new like
        const findUser = () => {
          return User.findById(userId)
            .then((user) => {
              return user.username;
            })
            .then((username) => {
              const like = new Like({
                username: username,
                postId: postId,
                likes: 1, // Assuming the initial like count is 1
              });
              like.save(async (err) => {
                if (err) {
                  throw err;
                }

                const token = await TokenGenerator.jsonwebtoken(req.user_id);
                res
                  .status(201)
                  .json({ message: "OK", token: token, likes: like });
              });
            })
            .catch((err) => {
              console.error(err);
              return err;
            });
        };
        findUser();
      }
    });
  },

  Unlike: async (req, res) => {
    try {
      const postId = req.params.postId;
      const userId = req.user_id;

      const existingLike = await Like.findOne({ postId: postId });
      if (existingLike) {
        // Like exists, check if userId already liked the post
        if (existingLike.likes.includes(userId)) {
          // User liked the post, perform unlike functionality
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

module.exports = LikesController;
