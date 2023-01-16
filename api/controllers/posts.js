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
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Update: async (req, res) => {
    console.log(req.body)
    post_id = req.params.id
    console.log(post_id)
    value = req.body.value
    field = req.body.field
    if (field === 'likes') {
      update = await Post.findOneAndUpdate({_id: post_id},{$push: {likes: value}} )
    } else if (field === 'comments') {
      update = await Post.findOneAndUpdate({_id: post_id},{$push: {comments: value}} )
    } else {
      throw err;
    }
    const token = await TokenGenerator.jsonwebtoken(req.user_id)
    res.status(200).json({ message: 'OK', token: token });
  }
};

module.exports = PostsController;




