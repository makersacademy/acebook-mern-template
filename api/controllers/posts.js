const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const tokenDecoder = require("../models/token_decode");

const PostsController = {
  Index: (req, res) => {   
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      console.log(posts);
      res.status(200).json({ posts: posts, token: token });//posts are contained here with the token
    });
  },
  Create: async (req, res) => {
    const post = new Post({message: req.body.message, author: tokenDecoder(req.headers['authorization'].split(' ')[1]).user_id});

    try {
      await post.save();

      await post.populate('author').execPopulate();

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      return res.status(201).json({ message: 'OK', token: token });
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred while saving the post' });
    }
  },
  DeletePost: async (req, res) => {
    // try {
    const { post_id } = req.params;
    await Post.deleteOne({ _id: post_id });
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: 'Post deleted', token: token });
    // } catch (err) {
    //   res.status(401).json({ message: 'Bad request' });
    // }
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


// , author: tokenDecoder(req.token).user_id
module.exports = PostsController;
