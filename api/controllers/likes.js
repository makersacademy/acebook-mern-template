const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const LikesController = {
  // return all posts
  // Index: (req, res) => {
  //   Post.find(async (err, posts) => {
  //     if (err) {
  //       throw err;
  //     }
  //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //     res.status(200).json({ posts: posts, token: token });
  //   });
  // },
  // create new post
  // Create: (req, res) => {
  //   const post = new Post(req.body);
  //   post.poster = req.user_id; // Experimental
  //   post.save(async (err) => {
  //     if (err) {
  //       throw err;
  //     }

  //     const token = await TokenGenerator.jsonwebtoken(req.user_id);
  //     res.status(201).json({ message: 'OK', token: token });
  //   });
  // },

  Like: (req, res) => {
    Post.findByIdAndUpdate(
      req.body.id,
      { $push: { likes: { userObj: req.body.userId } } },
      { new: true },
      async function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Updated Post : ', docs);
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: 'OK', token: token });
      }
    );
  },
};

module.exports = LikesController;