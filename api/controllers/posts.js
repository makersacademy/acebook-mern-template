const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    const populatedPosts = Post.find().populate('user');
    populatedPosts.find().sort('-date').find(async (err, posts) => {
      if (err) {
        throw err;
      }
     
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token, user: req.user_id });
    });
  },

  Create: (req, res) => {
    console.log(req);
    const postData = {message: req.body.message, user: req.user_id, token: req.body.token, img: req.body.img};
    console.log(postData);
    const post = new Post(postData);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ post: post, token: token});
    });
  },

  Likes: (req, res) => {
    const likedPost = Post.find(req.post_id);
    likedPost.likes.push(req.user_id)
    likedPost.save()

    res.status(200).json({ likedPost: post });
  }
};

module.exports = PostsController;
