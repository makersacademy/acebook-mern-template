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
    console.log(req.user_id);
    const findUser = () => {
      return User.findById(req.user_id)
        .then((user) => {
          return user.username;
        })
        .then((username) => {
          const like = new Like({
            username: username,
            postId: req.body.postId,
            likes: req.body.likes,
          });
          like.save(async (err) => {
            if (err) {
              throw err;
            }

            const token = await TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: "OK", token: token, likes: like }); // Return the comment
          });
        })
        .catch((err) => {
          console.error(err);
          return err;
        });
    };
    findUser();
  },
};

module.exports = LikesController;
