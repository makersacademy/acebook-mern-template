const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  // return all posts
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  // create new post
  Create: (req, res) => {
    const post = new Post(req.body);
    post.poster = req.user_id; // Experimental
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },

  // Define a comment (linked to post_id, username or user_id and req.body.comment)
  // save comment
  // the fetch post reqest req.body.comment assumes that the comment is packaged as object
};

module.exports = PostsController;
