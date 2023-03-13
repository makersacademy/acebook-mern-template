const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find()
      .populate("user", "name")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
      });
  },
  Create: (req, res) => {
    //injecting user_id here
    let postContent = { ...req.body, user: req.user_id };
    const post = new Post(postContent);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
  ToggleLike: (req, res) => {
    Post.findOne({ _id: req.params.id }).then(async (post) => {
      let liked;
      if (post.likes.includes(req.user_id)) {
        post.likes.splice(post.likes.indexOf(req.user_id), 1);
        console.log("Like removed");
        liked = false;
      } else {
        post.likes.push(req.user_id);
        console.log("Like added");
        liked = true;
      }
      post.save(async (err, post) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({
          token: token,
          message: "OK",
          likes: post.likes.length,
          liked: liked,
        });
      });
    });
  },
};

module.exports = PostsController;
