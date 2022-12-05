const router = require("../routes/posts");
const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    }).sort({ time: -1 });
  },
  Create: (req, res) => {
    req.body.time = Date.now();
    req.body.posterUserId = req.user_id;
    req.body.comments = [];
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  CreateComment: (req, res) => {
    req.body.time = Date.now();
    req.body.posterUserId = req.user_id;
    const post = new Post(req.body);
    console.log("Hello");
    console.log(req.body);
    post.findByIdAndUpdate(
      
      req.body.postId, //depends on comment_id being stored in body of POST request here
      {
        $push: {
          comments: {
            time: req.body.time,
            user: req.body.user_id, //depends on user_id being stored in body of POST request here
            comment: req.body.comment,
          },
        },
      },
      async (err) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "OK", token: token });
      }
    );
  },
};

module.exports = PostsController;
