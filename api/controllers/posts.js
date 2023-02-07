const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  Index: (req, res) => {
    // Use post schema with find query - **what is sent?**
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      // use token model (imported from models folder)
      // create a JWT by passing the request sender's user id
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // response is successful
      // currently only sends back json object with following details
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    // create a new instance of a post using information from the request
    const post = new Post(req.body);
    // use save method to store on the database
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      // create a JWT by passing the request sender's user id
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      // response is successful created (notice 201)
      // currently only sends back json object with following details
      res.status(201).json({ message: 'OK', token: token });
    });
  },
};

module.exports = PostsController;
