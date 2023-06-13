const Post = require("../models/post");
const Comment = require("../models/comment");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    // .find gets data out, .populate adds the referenced user fields
    // sort will take an object with a format of {property: sort, property: sort}
    // sort = -1 is descending, sort = 1 is ascending order
    // in the current format, if time is exactly the same it will sort alphabetically by message
    // note: (this is purely for the proof of concept, sounds silly to take into account)
    Post.find()
      .populate({ path: "user", select: ["name", "avatar"] })
      .populate({ path: "comment" })
      .sort({ time: -1, message: 1 })
      .exec((err, posts) => {
        if (err) {
          throw err;
        }
        const token = TokenGenerator.jsonwebtoken(req.user_id);
        // .json() on the backend sends an http response containing a json.
        res.status(200).json({ posts: posts, token: token });
      });
  },

  Create: (req, res) => {
    const post = new Post(req.body);
    post.user = req.user_id;

    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  Update: (req, res) => {
    // .findOneAndUpdate(filter, changes, return function)
    Post.findOneAndUpdate(
      { _id: req.body.postId },
      { likes: req.body.likes },
      async (err, posts) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.status(201).json({ message: "Post liked", token: token });
      }
    );
  },

  CreateComment: (req, res) => {
    // {
    //   post_id
    //   message
    // }

    const comment = new Comment(req.body);
    comment.user = req.user_id;

    comment.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "Comment posted", token: token });
    });
  },

  UpdatePost: (req, res) => {
    // Comments array inside Post contains a list of comment IDs

    Post.findOneAndUpdate(
      { _id: req.body.postId },
      { $push: { comments: req.body.commentId } },
      { new: true }
    ).then((post) => {
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ post: post, token: token });
    });
  },
};

module.exports = PostsController;
