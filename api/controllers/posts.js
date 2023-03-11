const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

// const PostsController = {

//   Index: (req, res) => {
//     Post.find(async (err, posts) => {
//       if (err) {
//         throw err;
//       }
//       const token = await TokenGenerator.jsonwebtoken(req.user_id)
//       res.status(200).json({ posts: posts, token: token });
//     });
//   },


  const PostsController = {
    Index: async (req, res) => {
      try {
        const posts = await Post.find().populate('poster', 'firstName').sort({createdAt: -1});;
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(200).json({ posts: posts, token: token });
        console.log(res.status);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Unable to retrieve posts' });
      }
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
};

module.exports = PostsController;
