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
  addCommentToPost: (req, res) => {
    // creates a new comment from the request body
    const comment = req.body.comment;
    // finds the post in the DB using the post's Id
    Post.findById(req.body.postId).then((post)=> {
      // adds comment to the post
      post.comments.push(comment);
      // updates the post in the DB
      post.save();
      // returns 202 OK
      res.status(202).json({ message: 'OK'});
    });

  },
};

module.exports = PostsController;
