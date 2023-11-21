const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      // map posts objects list so it displays from the newest by it's date
      // we're passing sorting function which calculates differences between two post objects
      posts.sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const user_id = req.user_id;
    const post = new Post({
      ...req.body,
      // added a line to add/update user_id field
      user_id: user_id,
    });
    console.log("REQUEST BODY BE:", req.body)
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token, post_id: post._id });
    });
  },

  // method to get posts filtered by user_id
  FindPostsByUserId: async (req, res) => {
    const user_id = req.params.user_id;

    // finding posts with specific user_id
    const result = await Post.find({ user_id: user_id });
    const token = TokenGenerator.jsonwebtoken(req.user_id);

    if (!result) {
      return res.status(400).json({ message: "No posts found" });
    } else {
      // post sorted from the newest
      result.sort((a, b) => b.createdAt - a.createdAt);
      res.status(200).json({ posts: result, token: token });
    }
  }

  // AddImage: async (req, res) => {
  //   const filename = req.body.filename;
  //   const post_id = req.body.post_id;
  //   console.log("BACKEND RECIEVED DATA: ", filename, post_id);

  //   // Check if the request contains filename and post id
  //   if (!filename || !post_id) {
  //     console.log()
  //     return res.status(400).json({ message: "Bad request" });
  //   }

  //   // replace filename: null with new filename
  //   const result = await Post.findOneAndUpdate(
  //     { _id: post_id },
  //     { $set: { image_path: filename } },
  //   );

  //   res.status(200).json({ message: "GOT FILENAME - OK" });
  // },
};

module.exports = PostsController;
