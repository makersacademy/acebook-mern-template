const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    console.log(req.body)
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Like: async (req, res) => {
    const id = req.params.id
    const post = await Post.findById(id);

    if(!post) {
      return res.status(404).send(`No post with ID ${id} found`)
    }
    
    const userId = req.body.userId;

    if (post.likes.includes(userId)) {
      return res.status(400).send("You have already liked this post");
    }

    post.likes.push(userId);
    await post.save();

    res.json(post);
  }
};

module.exports = PostsController;