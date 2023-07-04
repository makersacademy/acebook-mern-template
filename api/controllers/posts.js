const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const time = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes} ${day}-${month}-${year}`;
};

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.username);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const current_time = time();
    console.log(req.user_id);
    const post = new Post(req.username, current_time, req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.username);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = PostsController;
