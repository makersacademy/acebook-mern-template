const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const JWT = require("jsonwebtoken");

const PostsController = {
  Index: (req, res) => {
    // Post.find().populate({path: "authorUserID", select: "username"})
    Post.find().populate("authorUserID")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ posts: posts, token: token });
      });
  },

  // Create: (req, res) => {
  //   console.log(req.user_id)
  //   // check for valid token and extract userID from it
  //   let token;
  //   const authHeader = req.get("Authorization")
  //   if(authHeader) { token = authHeader.slice(7) }
  //   JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
  //     if(err) {
  //       console.log(err)
  //       res.status(401).json({message: "auth error"});
  //     } else {
  //       console.log(payload.user_id)
  //       const post = new Post({ ...req.body, authorUserID: payload.user_id });
  //       post.save(async (err) => {
  //         if (err) {
  //           throw err;
  //         }
  //         const token = await TokenGenerator.jsonwebtoken(req.user_id)
  //         res.status(201).json({ message: 'OK', token: token });
  //       });
  //     }
  //   });
  // }

  Create: (req, res) => {
    if (!req.user_id) { 
      return res.status(401).json({ message: 'Auth error' })
    }
    const post = new Post({ ...req.body, authorUserID: req.user_id });
    post.save(async (err) => {
      if (err) { throw err }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  }
};

module.exports = PostsController;

