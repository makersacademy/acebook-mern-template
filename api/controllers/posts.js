const Post = require("../models/post");
const TokenGenerator = require("../lib/token_generator");
// library to upload files into our server. Read more: https://www.npmjs.com/package/multer
// run npm install --save multer
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const PostsController = {
  Index: (req, res) => {
    Post.find((err, posts) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      // map posts objects list so it displays from the newest by it's date
      // we're passing sorting function which calculates differences between two post objects
      posts.sort((a, b) => b.createdAt - a.createdAt)
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    const user_id = req.user_id;
    const post = new Post({
      ...req.body,
      // added a line to add and update user_id field
      user_id: user_id,
      });
    post.save((err) => {
      if (err) {
        throw err;
      }

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },

  // method to get posts filtered by user_id
  FindPostsByUserId: async (req, res) => {
    const user_id = req.params.user_id

    // finding posts with specific user_id
    const result = await Post.find({user_id: user_id});
    const token = TokenGenerator.jsonwebtoken(req.user_id)

    if (!result) {
      return res.status(400).json({ message: "No posts found" });
    }
    else {
      // post sorted from the newest
      result.sort((a, b) => b.createdAt - a.createdAt)
      res.status(200).json({ posts: result, token: token });
    }
  },
  //method to add image file to uploads directory and store it in our server
  AddImageFile: async (req, res) => {
    const user_id = req.params.user_id
    const imageFile = req.image_file

  
    const token = TokenGenerator.jsonwebtoken(req.user_id)
  }
  };


module.exports = PostsController;
