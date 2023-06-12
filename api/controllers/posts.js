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
    console.log("HI THERE FROM CONTORLLER")
    console.log(req.user_id);
    post.save(async (err) => {
      if (err) {
        throw err;
      }
      console.log("MAKING TOKEN!")
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
};

module.exports = PostsController;

// addComment: