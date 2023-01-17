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
    post_id = req.params.id
    value = req.body.value
    field = req.body.field
    if (field === 'likes') {
      const post = await Post.findOne({_id: post_id});
      const likes = post.likes.toObject();
      post.likes.includes(value) ? beenLiked = true : beenLiked = false
      beenLiked ? update = await Post.findOneAndUpdate({_id: post_id},{$pull: {likes: value}} ) : update = await Post.findOneAndUpdate({_id: post_id},{$push: {likes: value}} )
    } else if (field === 'comments') {
      update = await Post.findOneAndUpdate({_id: post_id},{$push: {comments: value}} )
    } else {
      throw err;
    }
    const token = await TokenGenerator.jsonwebtoken(req.user_id)
    res.status(200).json({ message: 'OK', token: token });
  },
  FindUsersPosts: async (req, res) => {
    const id = req.params.id;
    const posts = await Post.find({ author: id });
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    res.status(200).json({ message: "OK", token: token, posts: posts });
  },
};

module.exports = PostsController;




