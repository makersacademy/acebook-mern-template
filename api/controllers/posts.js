const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  },
  Update: (req, res) => {
    const updated_post = req.body.message;
    let post_id = req.params.id;
    Post.findByIdAndUpdate(post_id, {"message": updated_post}, { new: true},
    (err, post) => {
      if (err) {
        throw err;
      }

      if (!post) {
        return res.status(404).json({error: "Post not found"});
      }
      
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({post: post, token: token});
    });
},
}

module.exports = PostsController;
