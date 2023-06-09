const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {   
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      console.log(posts);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  ShowPost: async (req, res) => {
    let post_id = req.params.id;
    console.log(post_id);
    let post = await Post.findById(post_id);
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({post, token: token});
  },
  UpdatePost: async (req, res) => {
    let post_id = req.params.id;
    await Post.findByIdAndUpdate(post_id, { message: req.body.message });
    
    const token = await TokenGenerator.jsonwebtoken(req.user_id)
    res.status(201).json({ message: 'OK', token: token });
  }
};

module.exports = PostsController;
