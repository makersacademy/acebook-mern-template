const Post = require('../models/post');
const TokenGenerator = require('../models/token_generator');

const PostsController = {
  Index: (req, res) => {
    Post.find({})
      .populate('user_id')
      .populate('comments')
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

  Delete: (req, res) => {
    Post.deleteOne({ _id: req.body._id }, async (err) => {
      if (err) {
        throw err;
      } else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id);

        res.status(204).json({ message: 'OK', token: token });
      }
    });
  },

  Update: (req, res) => {
    Post.updateOne(
      { _id: req.body._id },
      { $set: { message: req.body.message } },
      async (err) => {
        if (err) {
          throw err;
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res.status(204).json({ message: 'OK', token: token });
        }
      }
    );
  },
  Likes: (req, res) => {
    Post.updateOne(
      { _id: req.body._id },
      { $addToSet: { likes: req.body._user_id } }, //addToSet searches the array and if it matches it doesn't push
      async (err) => {
        if (err) {
          throw err;
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res.status(204).json({ message: 'OK', token: token });
        }
      }
    );
  },
  Unlikes: (req, res) => {
    Post.updateOne(
      { _id: req.body._id },
      { $pull: { likes: req.body._user_id } }, //addToSet searches the array and if it matches it doesn't push
      async (err) => {
        if (err) {
          throw err;
        } else {
          const token = await TokenGenerator.jsonwebtoken(req.user_id);
          res.status(204).json({ message: 'OK', token: token });
        }
      }
    );
  },
};
module.exports = PostsController;
