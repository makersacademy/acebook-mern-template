const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");
const JWT = require("jsonwebtoken");

const PostsController = {
  Index: (req, res) => {
    Post.find().populate("authorUserID")
      .exec(async (err, posts) => {
        if (err) {
          throw err;
        }

        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(200).json({ posts: posts, token: token });
      });
  },

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
  },

  // Pablo UPDATE version 3 6:40pm Monday 15th May
  Update: async (req, res) => {
    try {
      const post_id = req.params.id;
      const update = req.body;
      const updatedPost = await Post.findOneAndUpdate({ _id: post_id }, update, { new: true });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.json({token})
      // res.json({mssg: "You have updated this post!", token: token, updatedPost: updatedPost})
    } catch (err) {
      res.status(500).json({error: "messed up again!"})
    }
  },

  // Tom, Pablo and Ana version 2 Monday pm
  // Update: (req, res) => {
  //   const post_id = req.params.id;
  //   const update = req.body;
  //   Post.findOneAndUpdate({ _id: post_id }, update, { new: true },
  //     (async (updatedDoc) => {
  //       if (!updatedDoc) {
  //         res.status(400);
  //       }
        
  //       // res.status(204).json({ message: 'OK' });
  //     }))
  //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //       console.log(token)
  //       console.log("HELLLO")
  //       res.status(204).json({ message: 'OK', token: token });
  //   ;
  // },

  // Ana, Tom and Pablo version 1 Monday pm
  // Update: async (req, res) => {
  //   console.log("Hello")
  //   const post_id = req.params.id;
  //   const update = req.body;
  //   console.log(req.user_id)
  //   try {
  //     const updatedDoc = await Post.findOneAndUpdate({ _id: post_id }, update, {
  //       new: true,
  //     });
  //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //     console.log(req.user_id)
  //     console.log(token)
  //     res.status(204).json({ message: 'OK', token: token });

  //   } catch (err) {
  //     res.status(500); //server error
  //     console.log(err);
  //   }
  // },
};

module.exports = PostsController;

