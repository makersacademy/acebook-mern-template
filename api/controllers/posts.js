const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  // Retrieves a list of all posts
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      // checks if the user is logged in and matches the user_id
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts.reverse(), token: token });
    });
  },
  // It creates a post and saves it to the database
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err, post) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token, post: post });
    });
  },

  AddLikes: (req, res) => {
    const postId = req.params.id;
    const userId = req.user_id;
    Post.findById(postId, (err, post) => {
      if (err) {
        throw err;
      }
  
      // Check if the user has already liked the post
      if (post.likedBy.includes(userId)) {
        return res.status(400).json({ message: 'User has already liked this post.' });
      }
  
      const updatedPost = post;
      updatedPost.like += 1;
      updatedPost.likedBy.push(userId);
  
      updatedPost.save(async (err, updatedPost) => {
        if (err) {
          throw err;
        }
  
        const token = await TokenGenerator.jsonwebtoken(userId);
        res.status(201).json({ message: 'OK', token: token, post: updatedPost });
      });
    });
  },
}  

module.exports = PostsController;
