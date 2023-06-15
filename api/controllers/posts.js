const Post = require("../models/post");
const User = require("../models/user");
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
    User.findById(req.user_id).then((user) => {
      const requestObj = {
        username: user.username,
        message: req.body.message,
        usersRace: user.race
      }
      const post = new Post(requestObj);
      post.save(async (err) => {
        if (err) {
          console.log(err)
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'OK', token: token });
      });
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
      post.save(async (err) => {
        if(err) {
          throw err;
        }

        // generates a new tokem
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        // returns 202 OK with new token attached
        res.status(202).json({ message: 'OK', token: token });
      });
    });

  },
  AddLike: (req, res) => {
    Post.findById(req.body.postId)
    .then((post) => {
      post.likeCount ++
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  }); 
  },
};

module.exports = PostsController;
