const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const User = require("../models/user");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const timeCalc = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1; // Months are zero-based, so add 1
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
      return `${hours}:${minutes} ${day}-${month}-${year}`;
    };

    const findUser = () => {
      return User.findById(req.user_id)
        .then((user) => {
          return user.username;
        })
        .then((username) => {
          const post = new Post({
            username: username,
            time: timeCalc(),
            message: req.body.message,
          });
          post.save(async (err) => {
            if (err) {
              throw err;
            }

            const token = await TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: "OK", token: token, post: post }); // Return the post
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

module.exports = PostsController;
