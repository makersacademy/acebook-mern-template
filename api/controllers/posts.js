const Post = require("../models/post");
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    // .find is a mongoose method allowing us to get data out of the DB
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      // .json() on the backend sends an http response containing a json.
      res.status(200).json({ posts: posts, token: token });
    })
    // sort will take an object with a format of {property: sort, property: sort}
    // sort = -1 is descending, sort = 1 is ascending order
    // in the current format, if time is exactly the same it will sort alphabetically by message
    // note: (this is purely for the proof of concept, sounds silly to take into account)
    .sort({time: -1, message: 1});
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
