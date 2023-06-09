const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    // .find is a mongoose method allowing us to get data out of the DB
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      // .json() on the backend sends an http response containing a json.
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.user = req.user_id;

    console.log(post);

    post.save((err) => {
      if (err) {
        throw err;
      }

      Post.populate(post, { path: 'user', select: 'name' }, (err, populatedPost) => {
        if (err) {
          throw err;
        }

        console.log(populatedPost);
        
        const token = TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'OK', token: token });
      });
    });
  },
};

module.exports = PostsController;
