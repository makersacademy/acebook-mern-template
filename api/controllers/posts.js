const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ posts: posts, token: token });
    });
  },
  Create: (req, res) => {
    const post = new Post(req.body);
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: 'OK', token: token });
    });
  },
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

  Update: async (req, res) => {
    console.log("Hello")
    const post_id = req.params.id;
    const update = req.body;
    console.log(req.user_id)
    try {
      const updatedDoc = await Post.findOneAndUpdate({ _id: post_id }, update, {
        new: true,
      });
      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      console.log(req.user_id)
      console.log(token)
      res.status(204).json({ message: 'OK', token: token });

    } catch (err) {
      res.status(500); //server error
      console.log(err);
    }
  },
};

module.exports = PostsController;
