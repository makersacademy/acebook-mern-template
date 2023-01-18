const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .populate({ path: 'user_id', select: 'name avatar' })
      .exec(async (err, posts) => {
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

  Update: async (req, res) => {
    const { id } = req.params
    const post = await Post.findOneAndUpdate({_id: id}, {...req.body})
    const token = await TokenGenerator.jsonwebtoken(req.user_id);
    console.log('here')
    console.log(req);
  res.status(200).json({ message: 'OK', token: token})
  }
};

module.exports = PostsController;

// const PostsController = {
//   Index: (req, res) => {
//     Post.find(async (err, posts) => {
//       if (err) {
//         throw err;
//       }
//       const token = await TokenGenerator.jsonwebtoken(req.user_id);
//       res.status(200).json({ posts: posts, token: token });
//     });
//   },
